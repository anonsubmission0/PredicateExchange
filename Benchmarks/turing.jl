# Comparison of Predicate Exchange and Ohter Inference Procedures
using Turing, StatPlots, Random
import Omega  

# Iterate from having seen 0 observations to 100 observations.
Ns = 0:100;

# Draw data from a Bernoulli distribution, i.e. draw heads or tails.
Random.seed!(12)

function runprob(;n = 10, offset = 0.5, delta = 0.1, sig = 0.01,
                  alg = NUTS(1000,  0.65),  iterations = 1000)

  # Declare our Turing model.
  @model ring(y) = begin
      # Our prior belief about the probability of heads in a coin.
      T = Vector{Real}(undef, n)
      for i = 1:n
        T[i] ~ Uniform(-10, 10)
      end
      s = sum(T .^ 2)
      # s = prod(T)

      d = Omega.bound_loss(s, offset, offset + delta)
      y[1] ~ Normal(d, sig)
  end

  # Settings of the Hamiltonian Monte Carlo (HMC) sampler.
  ϵ = 0.05
  τ = 10

  # Start sampling.
  data = [0.0]
  # chain = sample(ring(data), HMC(iterations, ϵ, τ));
  chain = sample(ring(data), alg)
end

# c1 = sample(gdemo(1.5, 2), SMC(1000))
# c2 = sample(gdemo(1.5, 2), PG(10,1000))
# c3 = sample(gdemo(1.5, 2), HMC(1000, 0.1, 5))
# c4 = sample(gdemo(1.5, 2), Gibbs(1000, PG(10, 2, :m), HMC(2, 0.1, 5, :s)))
# c5 = sample(gdemo(1.5, 2), HMCDA(1000, 0.15, 0.65))
# c6 = sample(gdemo(1.5, 2), NUTS(1000,  0.65))

probs_ = [(d = d, delta = delta) for d in (1,100), delta in (0.1, 0.0001)] 

function getdata(probs, algs)
  data = []
  for prob in probs, alg in algs
    try
      res = runprob(; prob...)
      push!(data, (prob = prob, res = res, fail = false, alg = alg))
    catch e
      push!(data, (prob = prob, alg = alg, fail = true))
    end
  end
  data
end


# Construct summary of the sampling process for the parameter p, i.e. the probability of heads in a coin.
psummary = Chains(chain[:p])
histogram(psummary)
