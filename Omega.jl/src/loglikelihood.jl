I'd like to be able to do normal Bayesian inference
What does it involve?




function testbayesian()
  n = 10
  x = normal(0.0, 1.0)
  y = normal(x, 1.0, (n,))
  data = rand(y)
  rand(x, y == data, alg = NUTS)
end

# To make this work, we would need to
# 1. Compute logpdf
# 2. Actually condition the thing

# There are many limitatiosn
# What if you condition a derived random variable?
# We can detect tihs
# What if you condition several different things
# You can do that, but ou just cant use a conjunction, i suppose,
# need to repeated conditioning 
# cant use disjoinction, negation, etc.

# How to do it
# Make a special type for cond
# or detect based on the function type in the urandvar
# ω of a conditioned randvar should return whhat the condition is
# accumulate likelihood

# One issue ist hat we can't
# With current conditioning, if you condition x once, then
# all uses of x are conditoned because the conditino is applied to the sample space
# OTOH in this case if we modify cond to have a different ouput
# then some xs might not be conditoned which will be bad.
# so we need to do something a little like replace 
# but issue there is replace is local.
# if we do:
x = normal(0.0, 1.0)
y = normal(x, 1)
z = replace(y, x => 3)
a = z + y
x from the context of z is different to the x from the context of y.
And we want this.
its necessary, for counterfactuals, I think!
But that's not what we want from a conditioning perpscetive.

# From conditioning perspctive, we want them all to be consistnet.
hard, because where do we enforce that?
at the level of a in the example above, how should it know that x is conditioend
ohteriwe if we execute y first, and we get x, then how do we know
With the current setup, we choose a value for x regardless,
and compute its error.
We need to pass down a conditioning map onto 

struct CondRandVar
  x::R
  replmap::
end

struct EqCond{R1 <: RandVar, T2}
  y::R1
  yval::R2
end

"x | y = yval.  Equality is special case of conditioning"
struct EqCondRandVar{R, TPL}
  x::R
  conds::TPL
end

cond(x::RandVar, y::RandVar) = EqCondRandVar(x, y, yval)

# The issue is that if we pass around the condition with cond
# Then cond gets a massive type
# maybe thats not a problem
# That's a little difficult.
# The reason it's not a problem is because of noninjectivity
# or expansion or contraction of functions.


# But then the issue is that we don't have these values propagated
Eq
But we can't do this because of the reason outlined above
If we reuse the value of y in many places then hat.
unless we propagate the conditions
So really the problem is




bayestag(ω) = tag(ω, ()) 

"Likelihood of the trace"
function loglikelihood(ω::Omega, x::RandVar)
  # How would this work
  
end

mu_ = unif(0.0, 1.0)
mu = invcdf(mu)

x = normal(mu, 1)
x_ = cond(x, x == 1.0)


# 1. Make x == 1.0 create a special type: EqualityCondition
# 2. Modify x(ω) such that if y | x == c then x(ω) = c within y (probably using tagging)
# 3. Tag likelihood values

struct EqualityCondition
  x::
  y::
end

Base.(==)(x::Prim, y::Real) = EqualityCondition(x, y)