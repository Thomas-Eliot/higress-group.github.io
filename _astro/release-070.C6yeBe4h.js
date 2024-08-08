const e="release-070.md",s="blog",t="release-070",r=`
## \u8FDB\u5C55\u6982\u8981

1. Higress \u63A7\u5236\u53F0\u6B63\u5F0F release\uFF0C\u6DB5\u76D6 Higress \u7684\u670D\u52A1/\u8DEF\u7531/\u57DF\u540D/\u8BC1\u4E66\u7BA1\u7406\u80FD\u529B\uFF0C\u5E76\u63D0\u4F9B\u5F00\u7BB1\u5373\u7528\u7684\u53EF\u89C2\u6D4B\u529F\u80FD
2. \u5B89\u88C5/\u5347\u7EA7 Higress \u65F6\u652F\u6301\u81EA\u52A8\u5B89\u88C5\u5BF9\u5E94\u7248\u672C\u7684 Higress Console\uFF0C\u907F\u514D\u7248\u672C\u4E0D\u9002\u914D\u7684\u95EE\u9898
3. \u652F\u6301\u5F00\u542F Istio API\uFF0C\u5B9E\u73B0\u66F4\u591A\u590D\u6742\u7684\u529F\u80FD\uFF0C\u5E76\u4E14\u4E5F\u53EF\u4EE5\u7528\u4E8E\u5E73\u6ED1\u66FF\u6362 Istio Ingress Gateway


## \u7248\u672C\u7279\u6027

### Higress \u63A7\u5236\u53F0

\u73B0\u5728\u901A\u8FC7 helm \u547D\u4EE4\u5B89\u88C5 Higress \u65F6\u5C06\u81EA\u52A8\u5B89\u88C5\u5BF9\u5E94\u7248\u672C\u7684 Higress Console, \u8FD9\u91CC\u901A\u8FC7 \`higress-console.domain\` \u53C2\u6570\uFF0C\u53EF\u4EE5\u6307\u5B9A\u63A7\u5236\u53F0\u7684\u57DF\u540D\u3002

\`\`\`bash
# \u5DF2\u7ECF\u6DFB\u52A0\u8FC7 repo \u7684\uFF0C\u8BF7\u6267\u884C helm repo update
helm repo add higress.io https://higress.io/helm-charts
helm install higress -n higress-system higress.io/higress --create-namespace --render-subchart-notes --set higress-console.domain=console.higress.io
\`\`\`

![image](/img/user/quickstart/zh-cn/console-credentials.png)

\u6CE8\u610F\uFF1A\u5B89\u88C5\u5B8C\u6210\u540E\u4F1A\u8F93\u51FA\u4E00\u6BB5\u6587\u672C\uFF0C\u5176\u4E2D\u5305\u542B\u83B7\u53D6\u63A7\u5236\u53F0\u767B\u5F55\u4FE1\u606F\u7684\u547D\u4EE4\u3002\u8BF7\u6267\u884C\u8BE5\u547D\u4EE4\u5E76\u8BB0\u5F55\u7528\u6237\u540D\u548C\u5BC6\u7801\u3002

![image](/img/user/quickstart/zh-cn/login.png)

\u6B63\u5F0F\u73AF\u5883\u90E8\u7F72\u65F6\uFF0C\u5EFA\u8BAE\u63A7\u5236\u53F0\u5F00\u542F\u5F3A\u5236 HTTPS \u8BBF\u95EE\uFF0C\u5177\u4F53\u64CD\u4F5C\u65B9\u5F0F\u662F\uFF0C\u5728 higress-system \u547D\u540D\u7A7A\u95F4\u4E0B\u5148\u521B\u5EFA\u597D TLS \u8BC1\u4E66\u548C\u79C1\u94A5\u5BF9\u5E94\u7684 secret\uFF0C\u4F8B\u5982\uFF1A

\`\`\`yaml
apiVersion: v1
kind: Secret
type: kubernetes.io/tls
data:
  tls.crt: -----BEGIN CERTIFICATE-----...
  tls.key: -----BEGIN RSA PRIVATE KEY-----...
metadata:
  name: my-tls-secret
  namespace: higress-system
\`\`\`

\u7136\u540E\u901A\u8FC7\u4E0B\u9762 helm \u547D\u4EE4\u5F00\u542F\u5F3A\u5236 HTTPS \u8BBF\u95EE

\`\`\`bash
helm upgrade higress -n higress-system higress.io/higress --set higress-console.tlsSecretName=my-tls-secret
\`\`\`

\u5982\u679C\u5E0C\u671B\u542F\u7528 Higress \u81EA\u5E26\u7684 Prometheus&Grafana\uFF0C\u53EF\u4EE5\u901A\u8FC7\u4E0B\u9762 helm \u547D\u4EE4\u8FDB\u884C\u5B89\u88C5\uFF1A

\`\`\`bash
helm upgrade higress -n higress-system higress.io/higress --set global.o11y.enabled=true
\`\`\`

\u8FD9\u6837 Higress \u63A7\u5236\u53F0\u5C31\u53EF\u4EE5\u770B\u5230\u81EA\u5E26\u7684\u53EF\u89C2\u6D4B\u5927\u76D8\u4E86\uFF1A

![image](https://img.alicdn.com/imgextra/i3/O1CN01bUCXjy275GLq7ralt_!!6000000007745-0-tps-3532-2022.jpg)

\u5F53\u7136\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u5BF9\u63A5\u5DF2\u6709\u7684 Prometheus&Grafana\uFF0C\u4F7F\u7528\u8FD9\u4EFD Higress \u5B98\u65B9\u63D0\u4F9B\u7684 Dashboard \u914D\u7F6E\u5373\u53EF\uFF1Ahttps://higress.io/grafana/dashboard.json

\u53EF\u4EE5\u767B\u9646 Higress \u63A7\u5236\u53F0 Demo \u8BD5\u7528\u73B0\u6709\u6240\u6709\u529F\u80FD: http://demo.higress.io

### \u5F00\u542F Istio API

\u901A\u8FC7\u5F00\u542F Istio API\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u4F7F\u7528 Higress \u5E73\u6ED1\u66FF\u6362 Istio Ingress Gateway\uFF0C\u5177\u4F53 helm \u547D\u4EE4\u5982\u4E0B\uFF1A

\`\`\`bash
helm upgrade higress -n higress-system higress.io/higress --set global.enableIstioAPI=true
\`\`\`

\u57FA\u4E8E Istio API\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u76EE\u524D Higress \u8FD8\u672A\u63D0\u4F9B\u76F8\u5E94 Ingress \u6CE8\u89E3\u7684\u80FD\u529B\uFF0C\u4F8B\u5982\u57FA\u4E8E Istio EnvoyFilter \u6765\u5B9E\u73B0 HTTP to Dubbo \u7684\u534F\u8BAE\u8F6C\u6362\u914D\u7F6E\u65B9\u5F0F\uFF1A

\`\`\`yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: http-dubbo-transcoder
  namespace: higress-system
spec:
  configPatches:
  - applyTo: HTTP_FILTER
    match:
      context: GATEWAY
      listener:
        filterChain:
          filter:
            name: envoy.filters.network.http_connection_manager
            subFilter:
              name: envoy.filters.http.router
    patch:
      operation: INSERT_BEFORE
      value:
        name: envoy.filters.http.http_dubbo_transcoder
        typed_config:
          '@type': type.googleapis.com/udpa.type.v1.TypedStruct
          type_url: type.googleapis.com/envoy.extensions.filters.http.http_dubbo_transcoder.v3.HttpDubboTranscoder
  - applyTo: HTTP_ROUTE
    match:
      context: GATEWAY
      routeConfiguration:
        vhost:
          route:
            name: test
    patch:
      operation: MERGE
      value:
        route:
          upgrade_configs:
          - connect_config:
              allow_post: true
            upgrade_type: CONNECT
        typed_per_filter_config:
          envoy.filters.http.http_dubbo_transcoder:
            '@type': type.googleapis.com/udpa.type.v1.TypedStruct
            type_url: type.googleapis.com/envoy.extensions.filters.http.http_dubbo_transcoder.v3.HttpDubboTranscoder
            value:
              request_validation_options:
                reject_unknown_method: true
                reject_unknown_query_parameters: true
              services_mapping:
              - group: dev
                method_mapping:
                - name: sayName
                  parameter_mapping:
                  - extract_key: p
                    extract_key_spec: ALL_QUERY_PARAMETER
                    mapping_type: java.lang.String
                  passthrough_setting:
                    passthrough_all_headers: true
                  path_matcher:
                    match_http_method_spec: ALL_GET
                    match_pattern: /dubbo/hello
                name: com.alibaba.nacos.example.dubbo.service.DemoService
                version: 1.0.0
              url_unescape_spec: ALL_CHARACTERS_EXCEPT_RESERVED
\`\`\`

\u4E0A\u8FF0\u914D\u7F6E\u6BD4\u8F83\u590D\u6742\uFF0C\u539F\u56E0\u662F\u4E3A\u4E86\u65B9\u4FBF Envoy \u6570\u636E\u9762\u7A0B\u5E8F\u903B\u8F91\u5904\u7406\u800C\u8BBE\u8BA1\u7684 Schema\u3002\u76EE\u524D Higress \u793E\u533A\u5DF2\u7ECF\u5728\u8BBE\u8BA1\u66F4\u65B9\u4FBF Ingress \u914D\u7F6E\u4F7F\u7528\u7684 CRD\uFF0C\u540E\u7EED\u4E5F\u4F1A\u5728 Higress \u63A7\u5236\u53F0\u4E0A\u63D0\u4F9B\u5BF9\u5E94\u7684\u914D\u7F6E\u529F\u80FD\u3002


## GA \u7248\u672C\u89C4\u5212

Higress \u9884\u8BA1\u5C06\u57283\u6708\u5E95/4\u6708\u521D\u53D1\u5E03\u9996\u4E2A GA \u7248\u672C, \u8FD9\u4E2A\u7248\u672C\u7684\u4E3B\u8981\u89C4\u5212\u5982\u4E0B\uFF1A

1. \u5B9E\u73B0 HTTP to Dubbo \u534F\u8BAE\u8F6C\u6362\u7684\u63A7\u5236\u9762\u914D\u7F6E\u7B80\u5316
2. Higress \u63A7\u5236\u53F0\u63D0\u4F9B Wasm \u63D2\u4EF6\u80FD\u529B\uFF0C\u652F\u6301\u914D\u7F6E\u81EA\u5B9A\u4E49\u63D2\u4EF6
3. \u63A8\u51FA\u7B2C\u4E00\u7248 Higress Admin API\uFF0C\u53EF\u4EE5\u88AB\u5176\u4ED6\u5E73\u53F0/\u5DE5\u5177\u96C6\u6210
4. \u5168\u9762\u5B8C\u5584 Higress \u5B98\u7F51\u6587\u6863\uFF0C\u8986\u76D6 Higress \u5168\u90E8\u529F\u80FD\u7684\u8BE6\u7EC6\u8BF4\u660E


## Higress \u793E\u533A

\u6B22\u8FCE\u8BA4\u9886 Higress Issue \u4EFB\u52A1\uFF1Ahttps://github.com/alibaba/higress/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22

\u5B8C\u6210\u4E00\u5B9A\u6570\u91CF\u7684 Issues \u5C31\u53EF\u4EE5\u6210\u4E3A Higress Committer\uFF0C\u4E5F\u6709\u673A\u4F1A\u83B7\u5F97\u5F00\u6E90\u793E\u533A\u7684\u793C\u7269\u548C\u8363\u8A89\u{1F3C6}

\u6B22\u8FCE\u52A0\u5165 Higress \u793E\u533A\u7FA4\uFF0C\u53CA\u65F6\u4E86\u89E3\u66F4\u591A Higress \u52A8\u5411\uFF1A

![](https://img.alicdn.com/imgextra/i4/O1CN01xutJV11aSGvdgBHpC_!!6000000003328-0-tps-720-405.jpg)
`,i={title:"Higress 0.7.0 \u7248\u672C\u53D1\u5E03\uFF1AGA \u8FDB\u5165\u5012\u8BA1\u65F6",description:"Higress 0.7.0 \u7248\u672C\u4ECB\u7ECD",keywords:["higress"],date:"2023-03-20",author:"\u6F84\u6F6D",category:"article"},a={type:"content",filePath:"/home/runner/work/higress-group.github.io/higress-group.github.io/src/content/blog/release-070.md",rawData:void 0};export{a as _internal,r as body,s as collection,i as data,e as id,t as slug};
