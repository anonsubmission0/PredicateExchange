using Omega
using Test

function testiid()
  μ = uniform([-100.0, 100.0])
  x1 = normal(μ, 1)
  x2 = iid(x1)
  x3 = iid(x2)
  @test isiid(x2, x3)
end
