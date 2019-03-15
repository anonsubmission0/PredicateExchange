This is the anonymized source code for predicate exchange and accompanying experiments

# Files and Directories

Omega.jl - Julia package implementing predicate exchange inference

abcpt.jl - Emulating Likelihood-Free Parallel Tempering using a kernel

abcpt.png - Plot comparing abc-pt to predicate exchange images produced

RayTrace.jl - Module for RayTracer used in Benchmark

InvRayTrace.jl - Inverse Benchmark Experiment

Glucose - Glucose RNN experiment

Benchmarks - Benchmarks

# To Use

- clone this repository to PEPATH

```
git clone git@github.com/anonsubmission0/PredicateExchange.git PEPATH
```

- Install Julia

- Install predicate exchange packages:
(1) Open Julia Repl

```bash
julia
```

(ii)
```julia
] create AnonEnv
] develop PEPATH/Callbacks.jl
] add Spec#master
] develop PEPATH/Omega.jl
] develop PEPATH/RayTrace.jl
] develop PEPATH/InvRayTrace.jl
] develop PEPATH/Glucose.jl
```