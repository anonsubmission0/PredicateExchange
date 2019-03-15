Is it ever ok to violate the constraints that code reflection cannot be used from generated functions.

```
function naughty_return_types(@nospecialize(f), @nospecialize(types=Tuple))
  # ccall(:jl_is_in_pure_context, Bool, ()) && error("code reflection cannot be used from generated functions")
  # if isa(f, Core.Builtin)
  #     throw(ArgumentError("argument is not a generic function"))
  # end
  types = to_tuple_type(types)
  rt = []
  ...
  return rt
end
```

Empirically I have tested this and it hasn't obviously broken anything.
But I imagine it could well be breaking things in the background?

The reason I ask is I have a weird type problem which I haven't figured out how to solve without generated functions.
In short, I want to specialise behaviour on the return type of a method (actually a type with call overloaded) when applied to a known input type (e.g. Int).
The compiler can figure out the return type, but somehow I can't exploit this fact.

Suppose I want to dispatch on the return type of some input function applied to something of known type.

```
go(func, ::Type{Bool}) = dosomething!

go(func, returntype(func)) 

function returntype(func)
  first(Base.return_types(func, (Int,))) # Input type is fixed
end
```

This works but type inference cannot go through Base.return_types, so we have a slow dynamic dispatch
Hence the desire to use a generated function.

  Another option is to not use `Base.return_types` and simply apply f to some arbitrary Int

```
go(func) = go(func, typeof(func(0))
```