var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#Omega.jl-1",
    "page": "Home",
    "title": "Omega.jl",
    "category": "section",
    "text": "Omega.jl is a programming language for causal and probabilistic reasoning. It was developed by Zenna Tavares with help from Javier Burroni, Edgar Minasyan, Xin Zhang, Rajesh Ranganath and Armando Solar Lezama."
},

{
    "location": "#Quick-Start-1",
    "page": "Home",
    "title": "Quick Start",
    "category": "section",
    "text": "Omega is built in Julia 1.0.  You can easily install it from a Julia repl with:(v1.0) pkg> add OmegaCheck Omega is working and gives reasonable results with: julia> using Omega\n\njulia> rand(normal(0.0, 1.0))\n0.7625637212030862With that, see the Tutorial for a run through of the main features of Omega. "
},

{
    "location": "#Contribute-1",
    "page": "Home",
    "title": "Contribute",
    "category": "section",
    "text": "We want your contributions!Probabilistic modelsPlease add probabilistic models and model families to https://github.com/zenna/OmegaModels.jlInference procedures"
},

{
    "location": "#Citation-1",
    "page": "Home",
    "title": "Citation",
    "category": "section",
    "text": "If you use Omega, please cite Omega paper. <!– If you use the causal inference features, please cite. –> In addition, if you use the higher-order features, please cite the random conditional distribution paper."
},

{
    "location": "#Acknowledgements-1",
    "page": "Home",
    "title": "Acknowledgements",
    "category": "section",
    "text": "Omega leans heavily on the hard work of many packages and the Julia community as a whole, but in particular Distributions.jl, Flux.jl, and Cassette.jl."
},

{
    "location": "#Index-1",
    "page": "Home",
    "title": "Index",
    "category": "section",
    "text": ""
},

{
    "location": "basictutorial/#",
    "page": "Basic Tutorial",
    "title": "Basic Tutorial",
    "category": "page",
    "text": ""
},

{
    "location": "basictutorial/#Basic-Tutorial-1",
    "page": "Basic Tutorial",
    "title": "Basic Tutorial",
    "category": "section",
    "text": "In this tutorial we will run through the basics of creating a model and conditioning it.First load Omega:using OmegaIf you tossed a coin and observed the sequqnce HHHHH, you would be a little suspicious, HHHHHHHH would make you very suspicious. Elementary probability theory tells us that for a fair coin, HHHHHHHH is just a likely outcome as HHTTHHTH.  What gives?  We will use Omega to model this behaviour, and see how that belief about a coin changes after observing a number of tosses.Model the coin as a bernoulli distribution.  The weight of a bernoulli determines the probability it comes up true (which represents heads). Use a beta distribution to represent our prior belief weight of the coin.weight = β(2.0, 2.0)A beta distribution is appropriate here because it is bounded between 0 and 1. Draw a 10000 samples from weight using rand:beta_samples = rand(weight, 10000)Let\'s see what this distribution looks like using UnicodePlots.  If you don\'t have it installed already install with:] add UnicodePlotsTo visualize the distribution, plot a histogram of the samples:julia> UnicodePlots.histogram(beta_samples)             ┌────────────────────────────────────────┐ \n   (0.0,0.1] │▇▇▇▇▇▇ 279                              │ \n   (0.1,0.2] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 727                   │ \n   (0.2,0.3] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 1218       │ \n   (0.3,0.4] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 1354    │ \n   (0.4,0.5] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 1482 │ \n   (0.5,0.6] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 1426  │ \n   (0.6,0.7] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 1406   │ \n   (0.7,0.8] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 1124         │ \n   (0.8,0.9] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 702                    │ \n   (0.9,1.0] │▇▇▇▇▇▇ 282                              │ \n             └────────────────────────────────────────┘The distribution is symmetric around 0.5 and has support over the the interval [0, 1].So far we have not done anything we couldn\'t do with Distributions.jl. A primary distinction between a package like Distribution.jl, is that Omega.jl allows you to condition probability distributions.Create a model representing four flips of the coin. Since a coin can be heads or tales, the appropriate distribution is the bernouli distribution:nflips = 4\ncoinflips_ = [bernoulli(weight, Bool) for i = 1:nflips]Take note that weight is the random variable defined previously. bernoulli takes a type as its secoond argument; Bool indicates the result will be a Bool rather than an Int.coinflips is a normal Julia array of Random Variables (RandVars). For reasons we will elaborate in later sections, it will be useful to have an Array-valued RandVar (instead of an Array of RandVar).One way to do this (there are several ways discuseed later), is to use the function randarraycoinflips = randarray(coinflips_)coinflips is a RandVar and hence we can sample from it with randjulia> rand(coinflips)\n4-element Array{Float64,1}:\n 0.0\n 0.0\n 0.0\n 0.0\n\njulia> rand(coinflips)\n4-element Array{Float64,1}:\n 0.0\n 1.0\n 0.0\n 0.0\n\njulia> rand(coinflips)\n4-element Array{Float64,1}:\n 1.0\n 1.0\n 1.0\n 1.0Now we can condition the model. We want to find the conditional distribution over the weight of the coin given some observations.First create some fake dataobservations = [true, true, true, false]and then use rand to draw conditional samples:weight_samples = rand(weight, coinflips == observations, 10; alg = RejectionSample)weight_samples is a set of 10 samples from the conditional (sometimes called posterior) distribution of weight condition on the fact that coinflips == observations.In this case, rand takesA random variable we want to sample from\nA predicate (type RandVar which evaluates to a Bool) that we want to condition on, i.e. assert that it is true\nAn inference algorithm.  Here we use rejection samplingPlot a histogram of the weights like before:julia> UnicodePlots.histogram(weight_samples)\n             ┌────────────────────────────────────────┐ \n   (0.1,0.2] │▇ 4                                     │ \n   (0.2,0.3] │▇▇▇ 22                                  │ \n   (0.3,0.4] │▇▇▇▇▇▇▇▇▇▇▇ 69                          │ \n   (0.4,0.5] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 147             │ \n   (0.5,0.6] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 185       │ \n   (0.6,0.7] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 226 │ \n   (0.7,0.8] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 203     │ \n   (0.8,0.9] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 120                 │ \n   (0.9,1.0] │▇▇▇▇ 23                                 │ \n             └────────────────────────────────────────┘ \nObserve that our belief about the weight has now changed. We are more convinced the coin is biased towards heads (true)."
},

{
    "location": "model/#",
    "page": "Modeling",
    "title": "Modeling",
    "category": "page",
    "text": "In Omega a probabilistic model is a collection of random variables. Random Variables are of type RandVar. There are two ways to construct random variables: the statistical style, which can be less verbose, and more intuitive, but has some limitations, and the explicit style, which is more general."
},

{
    "location": "model/#Statistical-Style-1",
    "page": "Modeling",
    "title": "Statistical Style",
    "category": "section",
    "text": "In the statistical style we create random variables by combining a number of primitives. Omega comes with a number of built-in primitive distributions, the simplest of which is (arguably) the standard uniform:x1 = uniform(0.0, 1.0)x1 is a random variable not a sample. To construct another random variable x2, we do the same. x2 = uniform(0.0, 1.0)x1 and x2 are identically distributed and independent (i.i.d.).julia> rand((x1, x2))\n(0.5602978842341093, 0.9274576159629635)Contrast this with:julia> rand((x1, x1))\n(0.057271529749001626, 0.057271529749001626)"
},

{
    "location": "model/#Composition-1",
    "page": "Modeling",
    "title": "Composition",
    "category": "section",
    "text": "Statistical style is convenient because it allows us to treat a RandVar which returns values of type T (its elemtype) as if it is a value of type T.  For instance the elemtype(uniform(0.0, 1.0)) is Float64.  Using the statistical style, we can add, multiply, divide them as if they were values of type Float64.x3 = x1 + x2Note x3 is a RandVar like x1 and x2This includes inequalities:p = x3 > 1.0elemtype(p) is Booljulia> rand(p)\nfalseA particularly useful case is that primitive distributions which take parameters of type T, also accept RandVar with elemtype Tn = normal(x3, 1.0)Suppose you write your own function defined on the reals:myfunc(x::Float64, y::Float64) = (x * y)^2We can\'t automatically apply myfunc to RandVars; it will cause a method errorjulia> myfunc(x1, x2)\nERROR: MethodError: no method matching myfunc(::RandVar..., ::RandVar...)However this is easily remedied with the function lift:lift(myfunc)(x1, x2)"
},

{
    "location": "model/#Explicit-Style-1",
    "page": "Modeling",
    "title": "Explicit Style",
    "category": "section",
    "text": "The above style is convenient but has a few limitations and it hides a lot of the machinery. To create random variables in the explicit style, create a normal julia sampler, but it is essential to pass through the rng object.For instance, to define a bernoulli distribution in explicit style:x_(rng) = rand(rng) > 0.5x_ is just a normal julia function.  We could sample from it by passing in the GLOBAL_RNGjulia> x_(Base.Random.GLOBAL_RNG)\ntrueHowever, in order to use x for conditional or causal inference we must turn it into a RandVar. One way to do this (we discuss others in [conditonalindependence]) is using ciid.x = ciid(x_)All of the primitive distributions can be used in explicit style by passing the rng object as the first parameter (type constraints are added just to show that the return values are not random variables but elements.  But don\'t do this! It will prevent automatic differentiation based inference procedures from working): function x_(rng)\n  if bernoulli(rng, 0.5, Bool)\n    normal(rng, 0.0, 1.0)::Float64\n  else bernoulli(rng, 0.5, Bool)\n    betarv(rng, 2.0, 2.0)::Float64\n  end\nend\n\nciid(x_)Statistical style and functional style can be combined naturally. For example:x = ciid(rng -> rand(rng) > 0.5 ? rand(rng)^2 : sqrt(rand(rng)))\ny = normal(0.0, 1.0)\nz = x + y"
},

{
    "location": "model/#Random-Variable-Families-1",
    "page": "Modeling",
    "title": "Random Variable Families",
    "category": "section",
    "text": "Often we want to parameterize a random variable.  To do this we create functions with addition argument, and pass arguments to ciid.unif(rng, a, b) = rand(rng) * (b - a) + b  \nx = ciid(unif, 10, 20)And hence if we wanted to create a method that created independent uniformly distributed random variables, we could do it like so:uniform(a, b) = ciid(rng -> rand(rng) * (b - a) + b)"
},

{
    "location": "conditionalindependence/#",
    "page": "(Conditional) Independence",
    "title": "(Conditional) Independence",
    "category": "page",
    "text": ""
},

{
    "location": "conditionalindependence/#Conditionally-Independence-1",
    "page": "(Conditional) Independence",
    "title": "Conditionally Independence",
    "category": "section",
    "text": "Previously we saw that we could use ciid to turn a function rng into a RandVar."
},

{
    "location": "conditionalindependence/#Omega.ciid",
    "page": "(Conditional) Independence",
    "title": "Omega.ciid",
    "category": "function",
    "text": "ciid(f::Callable)\n\nRandVar that is conditionally identical (given its parents) but identically  distributed to f\n\nciid is the primary mechanism to construct a RandVar from a function.\n\nfunction x_(ω)\n  x = normal(ω, 0, 1)\nend\nx = ciid(x_)\nrand(x)\n\nIt is important to note that parents of f are shared. That is, if X is a RandVar, then X(ω) will return the same value from whatever context it is called.\n\nnumflips = poisson(2)\n\nflips_(ω) = [bernoulli(ω, 0.5, Bool) for i = 1:numflips(ω)]\nflips = ciid(flips_)\n\n\"At least one of numflips is true\"\nanyheads_(ω) = any(flips(ω))\nanyheads = ciid(anyheads_)\n\nallheads_(ω) = all(flips(ω))\nallheads = ciid(allheads_)\n\nrand((numflips, flips, anyheads, allheads))\n\n\n\n\n\nciid(x::RandVar) \n\nRandVar identically distributed to x but conditionally independent given parents`\n\n\n\n\n\nciid(f, args)\n\n\nciid with arguments\n\nIf arguments are random variables they are resolved to values.\n\nEquivalent to:\n\nciid(ω -> f(ω, (arg(ω) for arg in args)...))\n\nExample:\n\nfunction f_(ω, n)\n  x = 0.0\n  for i = 1:n\n    x += uniform(ω, 0, 1)\n  end\n  x\nend\n\nf = ciid(f_, poisson(3))\n\n\n\n\n\n"
},

{
    "location": "conditionalindependence/#Conditionally-Independent-Random-Variables-1",
    "page": "(Conditional) Independence",
    "title": "Conditionally Independent Random Variables",
    "category": "section",
    "text": "Use ciid(x) to create a random variable that is identical in distribution to x but conditionally independent given its parents.μ = uniform(0.0, 1.0)\ny1 = normal(μ, 1.0)\ny2 = ciid(y1)\nrand((y1, y2))ciid"
},

{
    "location": "inference/#",
    "page": "Conditional Inference",
    "title": "Conditional Inference",
    "category": "page",
    "text": ""
},

{
    "location": "inference/#Inference-1",
    "page": "Conditional Inference",
    "title": "Inference",
    "category": "section",
    "text": "The primary purpose of building a probabilistic model is to use it for inference. The kind of inference we shall describe is called posterior inference, Bayesian inference, conditional inference or simply probabilistic inference."
},

{
    "location": "inference/#Conditional-Sampling-Algorithms-1",
    "page": "Conditional Inference",
    "title": "Conditional Sampling Algorithms",
    "category": "section",
    "text": "While there are several kinds of things you would like to know about a conditional distribution (e.g., its mode) currently, all inference algorithms perform conditional sampling only. To sample from a conditional distribution: pass two random variables to rand, the distribution you want to sample from, and the predicate you want to condition on. For example:weight = β(2.0, 2.0)\nx = bernoulli()\nrand(weight, x == 0)It is fine to condition random variables on equalities or inequalities:x1 = normal(0.0, 1.0)\nrand(x1, x1 > 0.0)It\'s also fine to condition on functions of multiple variablesx1 = normal(0.0, 1.0)\nx2 = normal(0.0, 10)\nrand((x1, x2), x1 > x2)Note: to sample from more than one random variable, just pass a tuple of RandVars to rand."
},

{
    "location": "inference/#Omega.cond-Tuple{RandVar,RandVar}",
    "page": "Conditional Inference",
    "title": "Omega.cond",
    "category": "method",
    "text": "cond(x, y)\n\n\nCondition RandVar x with random predicate y whose elemtype is an AbstractBool\n\nx = normal(0.0, 1.0)\nx_ = cond(x, x > 0)\n\n\n\n\n\n"
},

{
    "location": "inference/#Conditioning-with-cond-1",
    "page": "Conditional Inference",
    "title": "Conditioning with cond",
    "category": "section",
    "text": "rand(x, y) is simply a shorter way of saying rand(cond(x, y)). That is, the primary mechanism for inference in Omega is conditioning random variables using cond.cond(::RandVar, ::RandVar)"
},

{
    "location": "inference/#Conditioning-the-Prior-1",
    "page": "Conditional Inference",
    "title": "Conditioning the Prior",
    "category": "section",
    "text": "In Bayesian inference the term posterior distribution is often used instead of conditional distribution.  Mathematically they are the same object, but posterior alludes to the fact that it is the distribution after (a posteriori) observing data. The distribution before observing data is often referred to as the prior.However, conditioning is a more general concept than observing data, and we can meaningfully \"condition the prior\".For example we can make a truncated normal distribution with:x = normal(0.0, 1.0)\nx_ = cond(x, x > 0.0)A shorter way to write this is to pass a unary function as the second argument to condx = cond(normal(0.0, 1.0), rv -> rv > 0.0)Or suppose we want a poisson distribution over the even numbersjulia> x = cond(poisson(3.0), iseven)\njulia> rand(x, 5)\n5-element Array{Any,1}:\n 2\n 6\n 4\n 2\n 4"
},

{
    "location": "inference/#Conditions-Propagate-1",
    "page": "Conditional Inference",
    "title": "Conditions Propagate",
    "category": "section",
    "text": "When you compose conditoned random variables together, their conditions propagate.  That is, if x is conditioned, and y is conditioned, and z depends on x and y, then z inherits all the conditions of x and y automatically.  For example:ispos(x) = x > 0.0\nweight = cond(normal(72, 1.0), ispos)\nheight = cond(normal(1.78, 1.0), ispos)\nbmi = weight / heightbmi is a function of both weight and height, both of which have their own conditions (namely, they are positive). Omega automatically propagates the conditions from weight and height onto bmi respects these conditions."
},

{
    "location": "soft/#",
    "page": "Soft Execution",
    "title": "Soft Execution",
    "category": "page",
    "text": ""
},

{
    "location": "soft/#Soft-Execution-1",
    "page": "Soft Execution",
    "title": "Soft Execution",
    "category": "section",
    "text": "note: Note\nTLDR: For inference problems which are continuous or high dimensional, use soft predicates to use more efficient inference routines.==ₛ\n>ₛ\n>=\n<=ₛ\n<ₛSoft predicates are supported (and required) by inference algorithms: SSMH, HMCFAST, NUTS, Replica.If the values x and y are not standard numeric types you will need to define a notion of distance (even if they are, you may want to wrap them and define a distance for this type).  Override Omega.d for the relevant typesOmega.d"
},

{
    "location": "soft/#Omega.d",
    "page": "Soft Execution",
    "title": "Omega.d",
    "category": "function",
    "text": "Distance between two values\n\n\n\n\n\n"
},

{
    "location": "soft/#Omega.SoftBool",
    "page": "Soft Execution",
    "title": "Omega.SoftBool",
    "category": "type",
    "text": "Soft Boolean.  Value in [0, 1]\n\n\n\n\n\n"
},

{
    "location": "soft/#Relaxation-1",
    "page": "Soft Execution",
    "title": "Relaxation",
    "category": "section",
    "text": "In Omega you condition on predicates. A predicate is any function whose domain is Boolean. These are sometimes called indicator functions or characteristic functions. In particular, in Omega we condition on Bool valued random variables:x = normal(0.0, 1.0)\ny = x == 1.0\nrand(y)From this perspective, conditioning means to solve a constraint. It can be difficult to solve these constraints exactly, and so Omega supports softened constraints to make inference more tractable.To soften predicates, use soft counterparts to primitive predicates. Suppose we construct a random variable of the form x == y. In the soft version we would write x ==ₛ y (or softeq(x, y)).julia> x = normal(0.0, 1.0)\njulia> y = x ==ₛ 1.0\njulia> rand(y)\nϵ:-47439.72956833765note: Note\nIn the Julia REPL and most IDEs ==ₛ is constructed by typing ==\\_s [tab].Softened predicates return values in unit interval [0, 1] as opposed to a simply true or false. Intuitively, 1 corresponds to true, and a high value (such as 0.999) corresonds to \"nearly true\". In practice, we encode this number in log scale [-Inf, 0] for numerical reasons. Mathematicallty, soft predicates they have the form:k_alpha(rho(x y))If rho(x y) denotes a notion of distance between x and y. Distances are determined by the method Omega.dOmega.dRather than output values of type Float64, soft predicate output values of type SoftBool.SoftBool"
},

{
    "location": "soft/#Omega.withkernel",
    "page": "Soft Execution",
    "title": "Omega.withkernel",
    "category": "function",
    "text": "Temporarily set global kernel\n\n\n\n\n\n"
},

{
    "location": "soft/#Distances-and-Kernels-1",
    "page": "Soft Execution",
    "title": "Distances and Kernels",
    "category": "section",
    "text": "Omega has a number of built-in kernels:kse\nkf1\nkparetoBy default, the squared exponential kernel kse is used with a default temperature parameter. The method withkernel can be used to choose which kernel is being applied within the context of a soft boolean operator.withkernel"
},

{
    "location": "inferencealgorithms/#",
    "page": "Inference Algorithms",
    "title": "Inference Algorithms",
    "category": "page",
    "text": ""
},

{
    "location": "inferencealgorithms/#Built-in-Inference-Algorithms-1",
    "page": "Inference Algorithms",
    "title": "Built-in Inference Algorithms",
    "category": "section",
    "text": "Omega comes with a number of built in inference algorithms. You can of course develop your own."
},

{
    "location": "inferencealgorithms/#Choosing-a-Sampling-Algorithm-1",
    "page": "Inference Algorithms",
    "title": "Choosing a Sampling Algorithm",
    "category": "section",
    "text": "The appropriate sampling algorithm depends on the kind of model.If your model is not conditioned, or the conditions are not very restricting, use RejectionSample\nIf your model is finite dimensional, continuous and unimodal use NUTS\nIf your model is finite dimensional, continuous and multimodal use Replica with NUTS\nIf your model is a mixture of discrete and continuous, or not of finite dimension, use SSMH or Replica with SSMH"
},

{
    "location": "inferencealgorithms/#Conditional-Sampling-1",
    "page": "Inference Algorithms",
    "title": "Conditional Sampling",
    "category": "section",
    "text": "Conditional sampling is done with rand and the algorithm are selected RejectionSample\nMI\nSSMH\nNUTS\nHMCFAST"
},

{
    "location": "causal/#",
    "page": "Causal Inference",
    "title": "Causal Inference",
    "category": "page",
    "text": ""
},

{
    "location": "causal/#Causal-Inference-1",
    "page": "Causal Inference",
    "title": "Causal Inference",
    "category": "section",
    "text": "Omega supports causal inference through the replace function and higher-order causal inference through the random interventional distribution rid. Causal inference is a topic of much confusion, we recommend this blog post for a primer."
},

{
    "location": "causal/#Causal-Intervention-the-replace-operator-1",
    "page": "Causal Inference",
    "title": "Causal Intervention - the replace operator",
    "category": "section",
    "text": "The replace operator models an intervention to a model. It changes the model.Omega.replaceIn Omega we use the syntax:replace(X, θold => θnew)To mean the random variable X where θold has been replaced with θnew.  For this to be meaningful, θold must be a parent of x.Let\'s look at an example:julia> μold = normal(0.0, 1.0)\n45:Omega.normal(0.0, 1.0)::Float64\n\njulia> x = normal(μold, 1.0)\n46:Omega.normal(Omega.normal, 1.0)::Float64\n\njulia> μnew = 100.0\n47:Omega.normal(100.0, 1.0)::Float64\n\njulia> xnew = replace(x, μold => μnew)\njulia> rand((x, xnew))\n(-2.664230595692529, 96.99998702926271)Observe that the sample from xnew is much greater, because it has the mean of the normal distribution has been changed to 100"
},

{
    "location": "causal/#Replace-a-Random-Variable-with-a-Random-Variable-1",
    "page": "Causal Inference",
    "title": "Replace a Random Variable with a Random Variable",
    "category": "section",
    "text": "Repacing a random variable with a constant is actually a special case of replacing a random variable with a number random variable.  The inference is the samejulia> xnewnew = replace(x, μold => normal(200.0, 1.0))\njulia> rand((x, xnew, xnewnew))\n(-1.2756627673001866, 99.1080578175426, 198.14711316585564)"
},

{
    "location": "causal/#Changing-Multiple-Variables-1",
    "page": "Causal Inference",
    "title": "Changing Multiple Variables",
    "category": "section",
    "text": "replace allow you to change many variables at once  Simply pass in a variable number of pairs, or a dictionary."
},

{
    "location": "causal/#Example-1",
    "page": "Causal Inference",
    "title": "Example",
    "category": "section",
    "text": "We can use replace and cond separately and in combination to ask lots of different kinds of questions. In this example, we model the relationship betwee the weather outside and teh thermostat reading inside a house. Broadly, the model says that the weather outside is dictataed by the time of day, while the temperature inside is determined by whether the air conditioning is on, and whether the window is open.First, setup simple priors over the time of day, and variables to determine whether the air conditioning is on and whether hte iwndow is open:timeofday = uniform([:morning, :afternoon, :evening])\nis_window_open = bernoulli(0.5)\nis_ac_on = bernoulli(0.3)Second, assume that the outside temperature depends on the time of day, being hottest in the afternoon, but cold at night:function outside_temp_(rng)\n  if timeofday(rng) == :morning\n    normal(rng, 20.0, 1.0)\n  elseif timeofday(rng) == :afternoon\n    normal(rng, 32.0, 1.0)\n  else\n    normal(rng, 10.0, 1.0)\n  end\nendRemember, in this style we have to use  ciid to convert a function into a RandVaroutside_temp = ciid(outside_temp_, T=Float64)The inside_temp before considering the effects of the window is room temperature, unless the ac is on, which makes it colder.function inside_temp_(rng)\n  if Bool(is_ac_on(rng))\n    normal(rng, 20.0, 1.0)\n  else\n    normal(rng, 25.0, 1.0)\n  end\nend\n\ninside_temp = ciid(inside_temp_, T=Float64)47:Omega.normal(100.0, 1.0)::Float64Finally, the thermostat reading is inside_temp if the window is closed (we have perfect insulation), otherwise it\'s just the average of the outside and inside temperaturefunction thermostat_(rng)\n  if Bool(is_window_open(rng))\n    (outside_temp(rng) + inside_temp(rng)) / 2.0\n  else\n    inside_temp(rng)\n  end\nend\n\nthermostat = ciid(thermostat_, T=Float64)Now with the model built, we can ask some questions:"
},

{
    "location": "causal/#Samples-from-the-prior-1",
    "page": "Causal Inference",
    "title": "Samples from the prior",
    "category": "section",
    "text": "The simplest task is to sample from the prior:julia> rand((timeofday, is_window_open, is_ac_on, outside_temp, inside_temp, thermostat), 5, alg = RejectionSample)\n5-element Array{Any,1}:\n (:afternoon, 0.0, 0.0, 32.349, 26.441, 26.441)   \n (:afternoon, 1.0, 0.0, 30.751, 25.143, 27.947)\n (:morning, 1.0, 0.0, 16.928, 24.146, 20.537)     \n (:afternoon, 1.0, 0.0, 30.521, 25.370, 27.946)\n (:morning, 1.0, 1.0, 16.495, 20.203, 18.349) "
},

{
    "location": "causal/#Conditional-Inference-1",
    "page": "Causal Inference",
    "title": "Conditional Inference",
    "category": "section",
    "text": "You enter the room and the thermostat reads hot. what does this tell you about the variables?samples = rand((timeofday, iswindowopen, isacon, outsidetemp, insidetemp, thermostat),                 thermostat > 30.0, 5, alg = RejectionSample)\njulia> samples = rand((timeofday, is_window_open, is_ac_on, outside_temp, inside_temp, thermostat),\n                       thermostat > 30.0, 5, alg = RejectionSample)\n5-element Array{Any,1}:\n (:evening, 1.0, 0.0, 33.64609872046609, 26.822449458789542, 30.234274089627817) \n (:afternoon, 1.0, 0.0, 34.37763909867243, 26.16221853550574, 30.269928817089088)\n (:evening, 1.0, 0.0, 34.32198183192978, 26.6773921624331, 30.499686997181442)   \n (:afternoon, 1.0, 0.0, 34.05126597960254, 26.51833791813246, 30.2848019488675)  \n (:afternoon, 1.0, 0.0, 32.92982568498735, 27.56800059609554, 30.248913140541447)"
},

{
    "location": "causal/#Counter-Factual-1",
    "page": "Causal Inference",
    "title": "Counter Factual",
    "category": "section",
    "text": "If I were to close the window, and turn on the AC would that make it hotter or colder\"thermostatnew = replace(thermostat, is_ac_on => 1.0, is_window_open => 0.0)\ndiffsamples = rand(thermostatnew - thermostat, 10000, alg = RejectionSample)\njulia> mean(diffsamples)\n-4.246869797640215So in expectation, that intervention will make the thermostat colder.  But we can look more closely at the distribution:julia> UnicodePlots.histogram([diffsamples...])\n\n                 ┌────────────────────────────────────────┐ \n   (-11.0,-10.0] │ 37                                     │ \n    (-10.0,-9.0] │▇▇▇▇ 502                                │ \n     (-9.0,-8.0] │▇▇▇▇▇▇▇▇▇▇▇ 1269                        │ \n     (-8.0,-7.0] │▇▇▇▇▇ 581                               │ \n     (-7.0,-6.0] │▇▇▇▇ 497                                │ \n     (-6.0,-5.0] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 3926 │ \n     (-5.0,-4.0] │▇ 65                                    │ \n     (-4.0,-3.0] │ 5                                      │ \n     (-3.0,-2.0] │ 3                                      │ \n     (-2.0,-1.0] │▇ 97                                    │ \n      (-1.0,0.0] │▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 1960                  │ \n       (0.0,1.0] │▇▇▇▇ 494                                │ \n       (1.0,2.0] │▇▇ 197                                  │ \n       (2.0,3.0] │▇▇ 237                                  │ \n       (3.0,4.0] │▇ 118                                   │ \n       (4.0,5.0] │ 12                                     │ \n                 └────────────────────────────────────────┘ In what scenarios would it still be hotter after turning on the AC and closing the window?rand((timeofday, outsidetemp, insidetemp, thermostat),       thermostatnew - thermostat > 0.0, 10, alg = RejectionSample)"
},

{
    "location": "higher/#",
    "page": "Distributional Inference",
    "title": "Distributional Inference",
    "category": "page",
    "text": ""
},

{
    "location": "higher/#Distributional-Inference-1",
    "page": "Distributional Inference",
    "title": "Distributional Inference",
    "category": "section",
    "text": "note: Note\nTLDR: Omega allows you to turn a distributional property (e.g. mean, var, kurtosis), from a concrete value (e.g. a Float64) into a RandVar.  These RandVars can then be conditioned.Use either rcd, rcdₛ or rid.rcd\nrid\nrcdₛrid are rcd are equivlaet in some cases. rid is much more efficient, so use that if possible. If they are not equivlanet and you must use rcd, it\'s likely you will want to use the rcdₛ which uses soft equality [ref]Since this is a new concept, it requires some explanation."
},

{
    "location": "higher/#Random-Distributional-Properties-1",
    "page": "Distributional Inference",
    "title": "Random Distributional Properties",
    "category": "section",
    "text": "Distributional properties are fixed (often real) values, but in a sense they are random variables too. For example, rainfall depends on temperature, the season, the presence of clouds, and so on. With respect to a model, expected rainfall is a real value, but it changes if we obtain new information. For example it rises if we observe clouds and falls to zero if we observe their absence. These two expectations becomes a random variable over expectations – a conditional expectation – when we take into account the probabilities of the presence or absence of clouds. Moreover, for each random variable in the model there is a corresponding conditional expectation. For instance, with respect to the season, conditional expected rainfall is a random variable over four expectations, one for each season; with respect to temperature it is a continuous distribution. These conditional expectations capture the uncertainty over expected rainfall that results from other variables in the model, whereas the unconditional expected rainfall averages all the uncertainty away.Omega has a number of mechanisms to automatically capture the uncertainty over any distributional property.  It is based on a new concept called the random conditional distribution."
},

{
    "location": "higher/#Omega.Higher.rcd",
    "page": "Distributional Inference",
    "title": "Omega.Higher.rcd",
    "category": "function",
    "text": "rcd(x, θ)\nrcd(x, θ, eq)\n\n\nRandom Conditional Distribution of x given Θ.\n\nRandom conditional distributions provide a mechanism to condition distributional properties. Given two random variables X and Θ, the random conditional distribution of X given Θ – which we denote X  Θ – is a a random distribution: a random variable whose elemtype is a random variables. In particular, each realization of X  Θ is the random variable X conditioned on Θ = θ where θ  Θ is a realization of Θ:\n\nThe random conditional distribution (rcd) of a random variable X Ω  τ_1 given Θ Ω  τ_2 is a random variable X  Θ  Ω  ( Ω  τ_1), defined as:\n\n(x  θ) = ω - x  (Θ = Θ(ω))\n\n\n\n\n\n"
},

{
    "location": "higher/#Random-Conditional-Distribution-1",
    "page": "Distributional Inference",
    "title": "Random Conditional Distribution",
    "category": "section",
    "text": "rcd"
},

{
    "location": "higher/#Omega.Higher.rid",
    "page": "Distributional Inference",
    "title": "Omega.Higher.rid",
    "category": "function",
    "text": "rid(x, θ)\n\n\nRandom Interventional Distribution of x given Θ\n\nμ = uniform([-100.0, 100.0])\nx = normal(μ, 1.0)\nx_ = rid(x, μ)\nmean(x_)\n\nGiven two random variables X and Θ, the random interventional distribution of X given Θ is a a random distribution (RandVar with elemtype RandVar). In particular, each realization of rid(X Θ) is the random variable X subject to the intervention Θ = Θ where Θ  Θ is a realization of Θ:\n\nThe random interventional distribution of a random variable X with elem type tau_1 given Θ Ω  τ_2 is a random variable x  do(θ) Ω  (Ω   τ_1), defined as:\n\nx  do(θ) = ω  x  do(θ = θ(ω))\n\n\n\n\n\n"
},

{
    "location": "higher/#Random-Interventional-Distribution-1",
    "page": "Distributional Inference",
    "title": "Random Interventional Distribution",
    "category": "section",
    "text": "rid"
},

{
    "location": "higher/#rcd-or-rid?-1",
    "page": "Distributional Inference",
    "title": "rcd or rid?",
    "category": "section",
    "text": "In many cases rcd and rid are equivalent.  In these cases you should prefer rid, since it is much more efficient.  The conditions with which they are equivalent are a bit subtle."
},

{
    "location": "distributions/#",
    "page": "Built-in Distributions",
    "title": "Built-in Distributions",
    "category": "page",
    "text": ""
},

{
    "location": "distributions/#Built-In-Distributions-1",
    "page": "Built-in Distributions",
    "title": "Built In Distributions",
    "category": "section",
    "text": "Omega comes with a number of built-in probability distributions."
},

{
    "location": "distributions/#Univariate-Distributions-1",
    "page": "Built-in Distributions",
    "title": "Univariate Distributions",
    "category": "section",
    "text": "bernoulli\nboolbernoulli\nbetarv\ncategorical\nconstant\nexponential\ngammarv\ninversegamma\nkumaraswamy\nlogistic\npoisson\nnormal\nuniform\nrademacher"
},

{
    "location": "distributions/#Multivariate-Distributions-1",
    "page": "Built-in Distributions",
    "title": "Multivariate Distributions",
    "category": "section",
    "text": "mvnormal\ndirichlet"
},

{
    "location": "distributions/#Statistics.mean",
    "page": "Built-in Distributions",
    "title": "Statistics.mean",
    "category": "function",
    "text": "Sample Mean\n\n\n\n\n\n"
},

{
    "location": "distributions/#Omega.Prim.prob",
    "page": "Built-in Distributions",
    "title": "Omega.Prim.prob",
    "category": "function",
    "text": "Probability x is true\n\n\n\n\n\n"
},

{
    "location": "distributions/#Describe-distributional-functions-1",
    "page": "Built-in Distributions",
    "title": "Describe distributional functions",
    "category": "section",
    "text": "Omega comes with some functions which summarize an entire distribution. Most of these are inherited from Distributions.jlmean\nprob"
},

{
    "location": "cheatsheet/#",
    "page": "Cheat Sheet",
    "title": "Cheat Sheet",
    "category": "page",
    "text": ""
},

{
    "location": "cheatsheet/#Cheat-Sheet-1",
    "page": "Cheat Sheet",
    "title": "Cheat Sheet",
    "category": "section",
    "text": ""
},

{
    "location": "cheatsheet/#Core-Functions-1",
    "page": "Cheat Sheet",
    "title": "Core Functions",
    "category": "section",
    "text": "The major functions that you will use in Omega are:ciid(x) : that is equal in distribution to x but conditionally independent given parents\ncond(x, y) : condition random variable x on condition y\nrand(x, n; alg=Alg) : n samples from (possibly conditioned) random variable x using algorithm ALG\nreplace(x, θold => θnew) : causal intervention in random variable\nrid(x, θ)  : distribution interventional distribution of x given θ  \nrcd(x, θ) or x ∥ θ  : random conditional distribution of x given θ"
},

{
    "location": "cheatsheet/#FAQ-1",
    "page": "Cheat Sheet",
    "title": "FAQ",
    "category": "section",
    "text": "How to sample from a joint distribution (more than one random variable at a time)?Pass a tuple of random variables, e.g: rand((x, y, z))How do I apply a f transformation to a random variable Some are already defined, e.g. sqrt(uniform(0, 1)), for everything else use lift lift(f(x))What\'s the difference between Omega "
},

{
    "location": "cheatsheet/#Built-in-Distributions-1",
    "page": "Cheat Sheet",
    "title": "Built-in Distributions",
    "category": "section",
    "text": "bernoulli(w) boolbernoulli(w) betarv categorical constant exponential gammarv invgamma kumaraswamy logistic poisson normal uniform rademacher"
},

{
    "location": "cheatsheet/#Built-in-Inference-Algorithms-1",
    "page": "Cheat Sheet",
    "title": "Built-in Inference Algorithms",
    "category": "section",
    "text": "RejectionSample MI SSMH SSMHDrift HMC HMCFAST"
},

{
    "location": "internalsoverview/#",
    "page": "Overview",
    "title": "Overview",
    "category": "page",
    "text": ""
},

{
    "location": "internalsoverview/#Overview-1",
    "page": "Overview",
    "title": "Overview",
    "category": "section",
    "text": "The desiderata for Omega are to increase the expressiveness of probabilistic programming, with minimal sacrifices to performance.Support conditioning on arbitrary predicates\nSupport conditioning on distributional propereties\nSupport causal inference\nBe based on solid probabilistic foundations (i.e., measure theory)\nIntegrate seamlessly with Julia\nBe fastSome of these points are contradictory.  For example only pure functions exist in measure theroy, whereas julia programs may have side effects. Also there are tradeoffs between being as fast as possible, while being as general as possible.We think we have found a good compromise in Julia."
},

{
    "location": "internalsoverview/#MiniOmega-1",
    "page": "Overview",
    "title": "MiniOmega",
    "category": "section",
    "text": "Omega is structured around two primary abstract types Ω and RandVar.module MiniOmega\nusing Random\n\nmutable struct Ω <: Random.AbstractRNG\n  data::Dict{Int, Any}\n  i::Int\nend\n\nΩ() = Ω(Dict(), 0)\n\nfunction Base.rand(w::Ω, args...)\n  w.i += 1\n  get!(w.data, w.i, rand(Random.GLOBAL_RNG, args...))\nend\n\nBase.rand(w::Ω, args...) = (w.i += 1; get!(w.data, w.i, rand(args...)))\nBase.rand(w::Ω, dims::Vararg{Integer,N} where N) = (w.i += 1; get!(w.data, w.i, rand(dims)))\n\nstruct RandVar\n  f::Function\nend\n\n(rv::RandVar)(w::Ω) = (w.i = 0; rv.f(w))\n\nBase.rand(x::RandVar) = x(Ω())\n\ncond(x::RandVar, y::RandVar) = RandVar(rng -> y(rng) ? x(rng) : error())\n\n\"Rejetion Sampling\"\nBase.rand(x::RandVar) = try x(Ω()) catch; rand(x) end\n\nexport RandVar, Ω\nend## Example\nusing Main.MiniOmega\nx_(rng) = rand(rng)\nx = RandVar(x_)\nω = Ω()\nx(ω)"
},

{
    "location": "omega/#",
    "page": "Ω",
    "title": "Ω",
    "category": "page",
    "text": ""
},

{
    "location": "omega/#Omega-1",
    "page": "Ω",
    "title": "Omega",
    "category": "section",
    "text": "As described in [models], random variables are thin wrappers around functions which take as input a value ω::Ω We previously described Ω as a type of AbstractRNG.  This is true, but the full store is a bit more complex"
},

{
    "location": "omega/#Omega.Space.Ω",
    "page": "Ω",
    "title": "Omega.Space.Ω",
    "category": "type",
    "text": "Probability Space indexed with values of type I\n\n\n\n\n\n"
},

{
    "location": "omega/#Omega.Space.SimpleΩ",
    "page": "Ω",
    "title": "Omega.Space.SimpleΩ",
    "category": "type",
    "text": "Fast SimpleΩ\n\nProperties\n\nFast tracking (50 ns overhead)\nSome overhead for get linear view\nHence easy to sample from\nUnique index for each rand value and hence: (i) Memory intensive\n\n\n\n\n\n"
},

{
    "location": "omega/#Ω-1",
    "page": "Ω",
    "title": "Ω",
    "category": "section",
    "text": "Ω is an abstract type which represents a sample space in probability theory.ΩSimpleΩ"
},

{
    "location": "omega/#Samplers-vs-Random-Variables-1",
    "page": "Ω",
    "title": "Samplers vs Random Variables",
    "category": "section",
    "text": "A sampler and a random variable have many similarities but are different. To demonstrate the difference, we shall show the changes one has to make to turn a sampler into an Omega RandVar.Create a sampler that x1() = rand() > 0.5x1 uses Random.GLOBAL_RNG in the background.  Instead, make it explicit:julia> x2(rng::AbstractRNG) = rand(rng) > 0.5\njulia> x2(Random.MersenneTwister())\nfalseMake a cosmetic changejulia> x2(rng::AbstractRNG) = rand(rng) > 0.5\njulia> x2(Random.MersenneTwister())\nfalse"
},

{
    "location": "randvar/#",
    "page": "RandVar",
    "title": "RandVar",
    "category": "page",
    "text": "Random Variables"
},

{
    "location": "contrib/#",
    "page": "Contribution Guide",
    "title": "Contribution Guide",
    "category": "page",
    "text": ""
},

{
    "location": "contrib/#Contribution-1",
    "page": "Contribution Guide",
    "title": "Contribution",
    "category": "section",
    "text": "Omega makes a strict distrinction between the model and the inference algorithms. This makes it easy to add new inference algorithms to Omega.Here we will describe how to implement a very simple inference procedure: rejection sampling.The first step is to define a new abstract type that sub types Algorithm\"My Rejection Sampling\"\nabstract type MyRejectionSample <: Algorithm endThen add a method to Base.rand with the following type\"Sample from `x | y == true` with rejection sampling\"\nfunction Base.rand(ΩT::Type{OT}, y::RandVar, alg::Type{MyRejectionSample};\n                   n = 100,\n                   cb = default_cbs(n)) where {OT <: Ω}The first argument ΩT::Type{OT} is the type of Omega that will be passed through.\ny::RandVar is a random predicate that is being conditioned on\nalg::Type{MyRejectionSample} should be as writtenThe remaining arguments are optional n is the number of samples, and cb are callbacksThe implementation is then\"Sample from `x | y == true` with rejection sampling\"\nfunction Base.rand(ΩT::Type{OT}, y::RandVar, alg::Type{MyRejectionSample};\n                   n = 100,\n                   cb = default_cbs(n)) where {OT <: Ω}\n  # Run all callbacks\n  cb = runall(cb)\n\n  # Set of samples in Omega to return\n  samples = ΩT[]\n\n  # The number which have been accepted\n  accepted = 1\n  i = 1\n  while accepted < n\n    ω = ΩT()\n    if err(y(ω)) == 1.0\n      push!(samples, ω)\n      accepted += 1\n      cb(RunData(ω, accepted, 0.0, accepted), IterEnd)\n    else\n      cb(RunData(ω, accepted, 1.0, i), IterEnd)\n    end\n    i += 1\n  end\n  samples\nend"
},

{
    "location": "omegavsotherppls/#",
    "page": "Omega vs other PPLs",
    "title": "Omega vs other PPLs",
    "category": "page",
    "text": ""
},

{
    "location": "omegavsotherppls/#Omega-vs-other-Probabilistic-Programming-Languages-1",
    "page": "Omega vs other PPLs",
    "title": "Omega vs other Probabilistic Programming Languages",
    "category": "section",
    "text": "There are many probabilistic programming languages and libraries. The objective of Omega is to increase the expressiveness of probabilistic programming languages.  There are models and inferenc queries that are either impossible or very difficult to express in other PPLs.  In particular:In Omega you condition on predicates\nOmega supports likelihood free inference\nOmega supports causal inference\nOmega is fastWe have taken care to ensure Omega is type-stable and generally fast."
},

{
    "location": "omegavsotherppls/#Omega-vs-Turing-1",
    "page": "Omega vs other PPLs",
    "title": "Omega vs Turing",
    "category": "section",
    "text": "Omega does not yet suport likelihood based inference, although it is planned, so use Turing if that is the case. Turing currently has more infernece procedures implemented. Omega is more flexible, likely faster, and supports causal and distributional inference."
},

{
    "location": "omegavsotherppls/#Omega-vs-Stan-1",
    "page": "Omega vs other PPLs",
    "title": "Omega vs Stan",
    "category": "section",
    "text": "Use stan if you model is expressible in stan, i.e.,  differentiable and of finite dimension. Otherwise, consider Omega"
},

{
    "location": "omegavsotherppls/#Omega-vs-Pyro,-TensorFlow-Probability-1",
    "page": "Omega vs other PPLs",
    "title": "Omega vs Pyro, TensorFlow Probability",
    "category": "section",
    "text": "Omega does not yet support variational inference (contributions welcome!), so use those frameworks if that is required.Omega interfaces seamlessly with Flux for Deep Bayesian Networks."
},

]}
