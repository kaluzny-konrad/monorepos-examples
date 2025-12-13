using System.Diagnostics;

namespace web_dotnet.Services;

public class PreactRenderer
{
    private readonly string _serverModulePath;

    public PreactRenderer()
    {
        // Path to the built server render module
        var serverModulePath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "..", "..", "packages", "ui-preact", "dist", "server.cjs"
        );

        _serverModulePath = Path.GetFullPath(serverModulePath);

        if (!File.Exists(_serverModulePath))
        {
            throw new FileNotFoundException(
                $"Server render module not found at {_serverModulePath}. " +
                "Make sure to run 'dotnet build' to build the Preact components first."
            );
        }
    }

    public string Render(string component, object props)
    {
        // Create a temporary script file to avoid escaping issues
        var tempScriptPath = Path.Combine(Path.GetTempPath(), $"preact-render-{Guid.NewGuid()}.js");
        try
        {
            var nodeScript = $@"const {{ render }} = require('{_serverModulePath.Replace("\\", "/")}');
const readline = require('readline');
const rl = readline.createInterface({{
  input: process.stdin,
  output: process.stdout,
  terminal: false
}});

let input = '';
rl.on('line', (line) => {{
  input += line;
}});

rl.on('close', () => {{
  const data = JSON.parse(input);
  const result = render(data.component, data.props);
  console.log(result);
}});
";
            File.WriteAllText(tempScriptPath, nodeScript);

            var psi = new ProcessStartInfo
            {
                FileName = "node",
                Arguments = tempScriptPath,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = Process.Start(psi)!;

            // Send component name and props as JSON
            var inputData = System.Text.Json.JsonSerializer.Serialize(new { component, props });
            process.StandardInput.WriteLine(inputData);
            process.StandardInput.Close();

            var output = process.StandardOutput.ReadToEnd();
            var error = process.StandardError.ReadToEnd();
            process.WaitForExit();

            if (process.ExitCode != 0)
            {
                throw new InvalidOperationException(
                    $"Failed to render component '{component}'. Error: {error}"
                );
            }

            return output.Trim();
        }
        finally
        {
            // Clean up temporary script
            if (File.Exists(tempScriptPath))
            {
                try { File.Delete(tempScriptPath); } catch { }
            }
        }
    }
}
