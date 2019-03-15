using Cassette
using IntervalArithmetic

x = @interval(0, 1)

f(x::Real, y::Real) = 2x+y

@primitive (f::Any)(x::Interval, y::Interval) = 