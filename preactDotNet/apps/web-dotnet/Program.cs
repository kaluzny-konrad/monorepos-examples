using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles();

app.MapGet("/", () =>
{
    var html = RenderPreact("Button", new { text = "Hello from Preact" });

    return Results.Text($$"""
        <html>
          <body>
            <div data-preact data-component="Button" data-props='{"text": "Hello from Preact"}'>
              {{html}}
            </div>

            <script type="module" src="/preact/client.js"></script>
          </body>
        </html>
    """, "text/html");
});

app.Run();

string RenderPreact(string component, object props)
{
    var jsonProps = System.Text.Json.JsonSerializer.Serialize(props);
    var psi = new ProcessStartInfo
    {
        FileName = "node",
        Arguments = $"ssr.js {component}",
        RedirectStandardOutput = true,
        RedirectStandardInput = true,
        UseShellExecute = false
    };

    psi.WorkingDirectory = Directory.GetCurrentDirectory();

    using var process = Process.Start(psi)!;
    process.StandardInput.WriteLine(jsonProps);
    process.StandardInput.Close();
    return process.StandardOutput.ReadToEnd();
}