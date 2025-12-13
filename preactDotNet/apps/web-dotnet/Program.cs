using web_dotnet.Services;

var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddSingleton<PreactRenderer>();
builder.Services.AddSingleton<ViewRenderer>();

var app = builder.Build();

app.UseStaticFiles();

app.MapGet("/", (PreactRenderer preactRenderer, ViewRenderer viewRenderer) =>
{
    var greetingHtml = preactRenderer.Render("Greeting", new { name = "Alice" });
    var counterHtml = preactRenderer.Render("CounterButton", new { });

    var html = viewRenderer.Render("Index", new Dictionary<string, string>
    {
        { "GREETING_HTML", greetingHtml },
        { "COUNTER_HTML", counterHtml }
    });

    return Results.Text(html, "text/html");
});

app.Run();