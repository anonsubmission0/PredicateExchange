
"Sample from posterior and record several diagnostics"
function sampleposterioradv(n = 50000; noi = false, alg = SSMH, gamma = 1.0, kwargs...)
  logdir = Random.randstring()
  writer = Tensorboard.SummaryWriter(logdir)
  cb = cbs(writer, logdir, n, img)
  noipred = Omega.lift(nointersect)(scene)
  obspred = img ==ₛ img_obs
  pred = noi ? (gamma * noipred) & obspred : obspred
  samples = rand(scene, pred, n; cb = cb, alg = alg, kwargs...)
  lmap = lenses(writer)
  samples
  # lenscall(lmap, rand, scene, img ==ₛ img_obs, n; alg = SSMH, cb = cb)
end