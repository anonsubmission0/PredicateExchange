# Predicate Exchange vs Likelihood-Free Parallel Tempering #

using PredicateExchange
using Plots
using Distributions: pdf, Normal

"Prior"
p(x) = pdf(Normal(0, 1), x)

"Approximate likelihood"
ℓ(x) = err(x >ₛ 0.0)

"Approximate posterior"
f(x) = p(x) * ℓ(x)

# Different Temperatures
alphas = [0.001, 1.0, 10.0, 100.0]

# Evaluate f(k) with a kernel
function fk(x; k)
  withkernel(k) do
    f(x)
  end
end

# Create an approximate posteriors at N different temperatures
fs = [x -> fk(x; k = r -> kse(r, α)) for α in alphas]

plot_pe = plot(fs, title = "Predicate Exchange", labels = alphas)

# Likelihood free Parallel Tempering ABC-PT #

"Kernel emulating ABC-PT"
kϵ(r, ϵ) = log(float((r) < ϵ)) # In logspace

epsilons  = [0.0, 1.0, 2.0, 5.0]

fs_abcpt = [x -> fk(x; k = r -> kϵ(r, ϵ)) for ϵ in epsilons]

plot_abcpt = plot(fs_abcpt, title = "Likelihood Free Parallel Tempering", labels = epsilons)

plot_both = plot(plot_pe, plot_abcpt)

savefig(plot_both, "abcpt.png")