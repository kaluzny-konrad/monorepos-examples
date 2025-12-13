namespace web_dotnet.Services;

public class ViewRenderer
{
    private readonly string _viewsDirectory;

    public ViewRenderer()
    {
        _viewsDirectory = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Views"
        );
    }

    public string Render(string viewName, Dictionary<string, string> variables)
    {
        var viewPath = Path.Combine(_viewsDirectory, $"{viewName}.html");
        
        if (!File.Exists(viewPath))
        {
            throw new FileNotFoundException($"View not found: {viewPath}");
        }

        var template = File.ReadAllText(viewPath);

        foreach (var variable in variables)
        {
            template = template.Replace($"{{{{{variable.Key}}}}}", variable.Value);
        }

        return template;
    }
}
