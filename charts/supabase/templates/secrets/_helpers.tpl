{{/*
Expand the name of the chart.
*/}}
{{- define "supabase.secret.name" -}}
{{- default (print .Chart.Name "-secret") .Values.secret.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "supabase.secret.fullname" -}}
{{- if .Values.secret.fullnameOverride }}
{{- .Values.secret.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default (print .Chart.Name "-secret") .Values.secret.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "supabase.secret.selectorLabels" -}}
app.kubernetes.io/name: {{ include "supabase.secret.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "supabase.secret.serviceAccountName" -}}
{{- if .Values.secret.serviceAccount.create }}
{{- default (include "supabase.secret.fullname" .) .Values.secret.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.secret.serviceAccount.name }}
{{- end }}
{{- end }}
