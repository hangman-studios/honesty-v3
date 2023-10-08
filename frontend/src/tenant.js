var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + process.env.SUPABASE_ANON_KEY);

var raw = JSON.stringify({
  "tenant": {
    "name": process.env.REALTIME_SERVICE,
    "external_id": process.env.REALTIME_SERVICE,
    "jwt_secret": process.env.API_JWT_SECRET,
    "extensions": [
      {
        "type": "postgres_cdc_rls",
        "settings": {
          "db_name": "app",
          "db_host": process.env.DB_HOST,
          "db_user": process.env.DB_USER,
          "db_password": process.env.DB_PASSWORD,
          "db_port": "5432",
          "region": "eu-west-1",
          "poll_interval_ms": 100,
          "poll_max_record_bytes": 1048576,
          "ip_version": 4
        }
      }
    ]
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

// ?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjkxMTg2NDAwLAogICAgImV4cCI6IDE4NDkwMzkyMDAKfQ.Ztlvz0iioEr7cbhTWSaYDCaGpAUKqvzliQbgcyONJZM
async function tenant() {
    const result = await fetch(process.env.REALTIME_SERVICE_URL + "api/tenants", requestOptions)
    const resultText = await result.text()
    console.log(resultText)
}

tenant()
