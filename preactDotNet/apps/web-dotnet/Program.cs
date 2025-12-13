using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () =>
{
    var html = RenderPreact("Button", new { text = "Hello from Preact" });

    return Results.Text($"""
        <html>
          <body>
            <div data-preact data-component="Button" data-props='{{"text": "Hello from Preact"}}'>
              {html}
            </div>

            <script type="module" src="/preact/client.js"></script>
          </body>
        </html>
    """, "text/html");
});

app.Run();

string RenderPreact(string component, object props)
{
    var psi = new ProcessStartInfo
    {
        FileName = "node",
        Arguments = $"ssr.js {component} '{System.Text.Json.JsonSerializer.Serialize(props)}'",
        RedirectStandardOutput = true
    };

    psi.WorkingDirectory = Directory.GetCurrentDirectory();

    using var process = Process.Start(psi)!;
    return process.StandardOutput.ReadToEnd();
}