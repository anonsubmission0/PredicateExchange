# Omega.jl

Omega.jl is a programming language for causal and probabilistic reasoning.
It was developed by [Zenna Tavares](http://zenna.org) with help from Javier Burroni, Edgar Minasyan, [Xin Zhang](http://people.csail.mit.edu/xzhang/), [Rajesh Ranganath](https://cims.nyu.edu/~rajeshr/) and [Armando Solar Lezama](https://people.csail.mit.edu/asolar/).

## Quick Start

Omega is built in Julia 1.0.  You can easily install it from a Julia repl with:

```julia
(v1.0) pkg> add Omega
```

Check Omega is working and gives reasonable results with: 

```julia
julia> using Omega

julia> rand(normal(0.0, 1.0))
0.7625637212030862
```

With that, see the [Tutorial](basictutorial.md) for a run through of the main features of Omega. 

## Contribute

We want your contributions!

- Probabilistic models
Please add probabilistic models and model families to https://github.com/zenna/OmegaModels.jl

- Inference procedures


## Citation

If you use Omega, please cite Omega paper.
<!-- If you use the causal inference features, please cite. -->
In addition, if you use the higher-order features, please cite the random conditional distribution paper.

## Acknowledgements

Omega leans heavily on the hard work of many packages and the Julia community as a whole, but in particular `Distributions.jl`, `Flux.jl`, and `Cassette.jl`.

## Index

```@contents
```

```@index
```
