# todos

add release: kube-prom-stack to metadata.labels in PodMonitor
https://stackoverflow.com/questions/75437313/prometheus-doesnt-discover-my-pod-monitor


maybe try 
https://stackoverflow.com/questions/52432191/auto-import-in-visual-studio-code-only-offering-absolute-path-with-lerna-subpack
```
 "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "holograph/src/*": ["src/*"]
    },
  }
```



# Prerequisites

install Stackpres operator (on microk8s cluster with observability addon enabled)

```
helm install --create-namespace --namespace stackgres stackgres-operator \
 --set grafana.autoEmbed=true \
 --set-string grafana.webHost=kube-prom-stack-grafana.observability \
 --set-string grafana.secretNamespace=observability \
 --set-string grafana.secretName=kube-prom-stack-grafana \
 --set-string grafana.secretUserKey=admin-user \
 --set-string grafana.secretPasswordKey=admin-password \
 stackgres-charts/stackgres-operator
```

# Deploy

run in `charts/supabase/`
```
helm install prod -n supabase -f values.yaml .
```

# Supabase Kubernetes

This repository contains the charts to deploy a [Supabase](https://github.com/supabase/supabase) instance inside a Kubernetes cluster using Helm 3.

For any information regarding Supabase itself you can refer to the [official documentation](https://supabase.io/docs).

## What's Supabase ?

Supabase is an open source Firebase alternative. We're building the features of Firebase using enterprise-grade open source tools.

## How to use ?

You can find the documentation inside the [chart directory](./charts/supabase/README.md)

## Support

This project is supported by the community and not officially supported by Supabase. Please do not create any issues on the official Supabase repositories if you face any problems using this project, but rather open an issue on this repository.

## Contributing

You can contribute to this project by forking this repository and opening a pull request.

When you're ready to publish your chart on the `main` branch, you'll have to execute `sh build.sh` to package the charts and generate the Helm manifest.

## License

[Apache 2.0 License.](./LICENSE)
