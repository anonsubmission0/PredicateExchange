abstract type Energy<RandVar <: AbstractRandVar{T} end

struct EnergyRandVar{F}
  pdf::F
end

struct LogEnergyRandVar{F}
  logpdf::F
end

function (rv::EnergyRandVar)(w::Omega)
  # Sample Omega according to
  # Add on some error
end

# Somehow we need to associate a propsal distribution with it
# But should that be part of the model?

function test()
  x = LogEnergyRandVar(x -> Distributions.logpdf(Normal(0.0, 1.0), x))
  y = x + x
  rand(x, )
end

## IID
## ===

struct IIDTag
  id::Int
end

@inline project(x::RandVar, ω) = ω[x.i]
@inline project(x::RandVar, ω::TaggedΩ{IIDTAG}) = ω[x.id, iidtag(ω)]

"Construct RandVar which is i.i.d. to `x``"
iid(x::RandVar) = tag(x, IIDTag(uid()))

function testiid()
  μ = uniform([-100.0, 100.0])
  x1 = normal(μ, 1)
  x2 = iid(x1)
  x3 = iid(X2)
end


## It would be great if tag were just a named tuple
## BUT Need to dispatch on existance of a field