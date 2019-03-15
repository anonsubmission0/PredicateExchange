tagiid(ω, id = uid()) = tag(ω, (iid = id,))

@inline function iidapl(rv::RandVar, tω::TaggedΩ{I, Tags{K, V}, ΩT}) where {I, K, V, ΩT <: ΩBase}
  (rv, proj(tω, rv))
  ppapl(rv, proj(tω, rv))
end

function newid(x::RandVar, id)
  # Issue is that if we memoize
  # Why would i need
  # tuple randvar ids
  # just replace the whole thing with the new id
  # but what baout the inner
  # Tricky
  # Wow 
  # What if we pair it
  # pair(6, 3)
  # issue is that how can we stop
  # the counter from taking it
  # 
end

@inline function iidapl(tω::TaggedΩ, x::RandVar)
  rv = newid(x, combine(x.id, tω.tags.iid))
  tag(proj(tω.taggedω, rvid), tω.tags)
  ω[x.id, iidtag(ω)]
end


"""$(SIGNATURES)
RandVar which is independent but identically distributed to `x`

Unlike `ciid(x)`, `iid(x)` will not share parents with `x`

```julia
\theta = normal(0, 1)
y = normal(\theta, 1))
"""
iid(x::RandVar, id = uid) = URandVar(ω-> tagiid(ω, id))
@spec :nocheck x ⟂ _res