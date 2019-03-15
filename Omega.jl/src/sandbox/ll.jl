import DataStructures: nil, cons, LinkedList
## Linked List
## ===========
@inline append(a::LinkedList, b::Int) = cons(b, a)
@inline base(::Type{LinkedList}, i) = cons(i, nil())
