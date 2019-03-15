using Omega

function x(rng)
  σ, LΩ = θ
  (all(isfinite.(σ)) && all(isfinite.(LΩ))) || return -Inf
  LΣ = Diagonal(σ) * LΩ
  Σ = LΣ*LΣ'
  dist = MvNormal(Σ)
  log_likelihood = sum(logpdf(dist, m.observations))
  log_prior = sum(logpdf.(Cauchy(2.5), σ)) + lkj_correlation_cholesky_logpdf(LΩ, 2)
  log_prior + log_likelihood
end

