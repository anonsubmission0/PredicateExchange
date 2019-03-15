
using DynamicHMC, LogDensityProblems
using TransformVariables: as𝕀, as
using LogDensityProblems
using ForwardDiff
using Omega.Space: flat
import TransformVariables

"Flux based Hamiltonian Monte Carlo Sampling"
struct DynamicHMCAlg <: SamplingAlgorithm end

"Flux based Hamiltonian Monte Carlo Sampling"
const DynamicHMC = DynamicHMCAlg()
defcb(::DynamicHMCAlg) = default_cbs()
defΩ(::DynamicHMCAlg) = Omega.LinearΩ{Vector{Int64}, Omega.Space.Segment, Real}
