# using ONNX
path = joinpath(dirname(pathof(InvRayTrace)), "..", "squeezenetweights.jld2")
const weights = Dict(k => Float64.(v) for (k, v) in load(path))

fcat(dims, args...) = cat(args...; dims = dims)
Mul(a,b,c) = b .* reshape(c, (1,1,size(c)[a],1)) 
Add(axis, A ,B) = A .+ reshape(B, (1,1,size(B)[1],1)) 
const c_1 = Conv(weights["conv10_w_0"], weights["conv10_b_0"], stride=(1, 1), pad=(0, 0))
const c_2 = Dropout(0.5f0)
const c_3 = Conv(weights["fire9/expand1x1_w_0"], weights["fire9/expand1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_4 = Conv(weights["fire9/squeeze1x1_w_0"], weights["fire9/squeeze1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_5 = Conv(weights["fire8/expand1x1_w_0"], weights["fire8/expand1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_6 = Conv(weights["fire8/squeeze1x1_w_0"], weights["fire8/squeeze1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_7 = Conv(weights["fire7/expand1x1_w_0"], weights["fire7/expand1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_8 = Conv(weights["fire7/squeeze1x1_w_0"], weights["fire7/squeeze1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_9 = Conv(weights["fire6/expand1x1_w_0"], weights["fire6/expand1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_10 = Conv(weights["fire6/squeeze1x1_w_0"], weights["fire6/squeeze1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_11 = Conv(weights["fire5/expand1x1_w_0"], weights["fire5/expand1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_12 = Conv(weights["fire5/squeeze1x1_w_0"], weights["fire5/squeeze1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_13 = Conv(weights["fire4/expand1x1_w_0"], weights["fire4/expand1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_14 = Conv(weights["fire4/squeeze1x1_w_0"], weights["fire4/squeeze1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_15 = Conv(weights["fire3/expand1x1_w_0"], weights["fire3/expand1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_16 = Conv(weights["fire3/squeeze1x1_w_0"], weights["fire3/squeeze1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_17 = Conv(weights["fire2/expand1x1_w_0"], weights["fire2/expand1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_18 = Conv(weights["fire2/squeeze1x1_w_0"], weights["fire2/squeeze1x1_b_0"], stride=(1, 1), pad=(0, 0))
const c_19 = Conv(weights["conv1_w_0"], weights["conv1_b_0"], stride=(2, 2), pad=(0, 0))
const c_20 = Conv(weights["fire2/expand3x3_w_0"], weights["fire2/expand3x3_b_0"], stride=(1, 1), pad=(1, 1))
const c_21 = Conv(weights["fire3/expand3x3_w_0"], weights["fire3/expand3x3_b_0"], stride=(1, 1), pad=(1, 1))
const c_22 = Conv(weights["fire4/expand3x3_w_0"], weights["fire4/expand3x3_b_0"], stride=(1, 1), pad=(1, 1))
const c_23 = Conv(weights["fire5/expand3x3_w_0"], weights["fire5/expand3x3_b_0"], stride=(1, 1), pad=(1, 1))
const c_24 = Conv(weights["fire6/expand3x3_w_0"], weights["fire6/expand3x3_b_0"], stride=(1, 1), pad=(1, 1))
const c_25 = Conv(weights["fire7/expand3x3_w_0"], weights["fire7/expand3x3_b_0"], stride=(1, 1), pad=(1, 1))
const c_26 = Conv(weights["fire8/expand3x3_w_0"], weights["fire8/expand3x3_b_0"], stride=(1, 1), pad=(1, 1))
const c_27 = Conv(weights["fire9/expand3x3_w_0"], weights["fire9/expand3x3_b_0"], stride=(1, 1), pad=(1, 1))
function squeezenet(x_28) 
    c_19_ = c_19(x_28)
    edge_29 = relu.(c_18(maxpool(relu.(c_19_), (3, 3), pad=(0, 0), stride=(2, 2))))
    edge_30 = relu.(c_16(fcat(3, relu.(c_17(edge_29)), relu.(c_20(edge_29)))))
    edge_31 = relu.(c_14(maxpool(fcat(3, relu.(c_15(edge_30)), relu.(c_21(edge_30))), (3, 3), pad=(0, 0), stride=(2, 2))))
    edge_32 = relu.(c_12(fcat(3, relu.(c_13(edge_31)), relu.(c_22(edge_31)))))
    edge_33 = relu.(c_10(maxpool(fcat(3, relu.(c_11(edge_32)), relu.(c_23(edge_32))), (3, 3), pad=(0, 0), stride=(2, 2))))
    edge_34 = relu.(c_8(fcat(3, relu.(c_9(edge_33)), relu.(c_24(edge_33)))))
    edge_35 = relu.(c_6(fcat(3, relu.(c_7(edge_34)), relu.(c_25(edge_34)))))
    edge_36 = relu.(c_4(fcat(3, relu.(c_5(edge_35)), relu.(c_26(edge_35)))))
    lens(:filters, c_19_, edge_30, edge_34, edge_32, edge_31, x_28)
end

function squeezenet2(x_28)
    features = []
    id!(x) = (push!(features, x); x)
    id!(x_28)
    c_19_ = id!(c_19(x_28))
    edge_29 = relu.((id! ∘ c_18)(maxpool(relu.(c_19_), (3, 3), pad=(0, 0), stride=(2, 2))))
    # edge_30 = relu.((id! ∘ c_16)(fcat(3, relu.((id! ∘ c_17)(edge_29)), relu.((id! ∘ c_20)(edge_29)))))
    # edge_31 = relu.((id! ∘ c_14)(maxpool(fcat(3, relu.((id! ∘ c_15)(edge_30)), relu.((id! ∘ c_21)(edge_30))), (3, 3), pad=(0, 0), stride=(2, 2))))
    # edge_32 = relu.((id! ∘ c_12)(fcat(3, relu.((id! ∘ c_13)(edge_31)), relu.((id! ∘ c_22)(edge_31)))))
    # edge_33 = relu.((id! ∘ c_10)(maxpool(fcat(3, relu.((id! ∘ c_11)(edge_32)), relu.((id! ∘ c_23)(edge_32))), (3, 3), pad=(0, 0), stride=(2, 2))))
    # edge_34 = relu.((id! ∘ c_8)(fcat(3, relu.((id! ∘ c_9)(edge_33)), relu.((id! ∘ c_24)(edge_33)))))
    # edge_35 = relu.((id! ∘ c_6)(fcat(3, relu.((id! ∘ c_7)(edge_34)), relu.((id! ∘ c_25)(edge_34)))))
    # edge_36 = relu.((id! ∘ c_4)(fcat(3, relu.((id! ∘ c_5)(edge_35)), relu.((id! ∘ c_26)(edge_35)))))
    # lens(:filters, features...)
    features
end

function squeezenet3(x_28)
    features = []
    id!(x) = (push!(features, x); x)
    c_19_ = c_19(x_28)
    edge_29 = relu.(c_18(maxpool(relu.(c_19_), (3, 3), pad=(0, 0), stride=(2, 2))))
    edge_30 = relu.(c_16(fcat(3, relu.(c_17(edge_29)), relu.(c_20(edge_29)))))
    edge_31 = relu.(c_14(maxpool(fcat(3, relu.(c_15(edge_30)), relu.(c_21(edge_30))), (3, 3), pad=(0, 0), stride=(2, 2))))
    edge_32 = relu.(c_12(fcat(3, relu.(c_13(edge_31)), relu.(c_22(edge_31)))))
    edge_33 = relu.(c_10(maxpool(fcat(3, relu.(c_11(edge_32)), relu.(c_23(edge_32))), (3, 3), pad=(0, 0), stride=(2, 2))))
    edge_34 = relu.(c_8(fcat(3, relu.(c_9(edge_33)), relu.(c_24(edge_33)))))
    edge_35 = relu.(c_6(fcat(3, relu.(c_7(edge_34)), relu.(c_25(edge_34)))))
    edge_36 = relu.(c_4(fcat(3, relu.(c_5(edge_35)), relu.(c_26(edge_35)))))
    lens(:layers, c_19_, edge_30, edge_34, edge_32, edge_31, x_28)
end