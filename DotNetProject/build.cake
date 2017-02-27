#tool "nuget:?package=NUnit.ConsoleRunner"
#addin "Cake.WebDeploy"

var configuration = Argument("configuration", "Release");
var packageDir = MakeAbsolute(Directory("../Project_Package"));

Task("Publish")
    .Description("Publish the website to a package at " + packageDir)
    .Does(() =>
{ 
	MSBuild("./Project_1/Project_1.csproj", settings =>
			settings.SetConfiguration(configuration)	
			.WithProperty("TreatWarningsAsErrors","false")				
			.WithTarget("WebPublish")
			.WithProperty("WebPublishMethod", new string[]{ "FileSystem" })
			.WithProperty("PublishUrl", new string[]{ packageDir.ToString()}));
	
	Console.WriteLine("\n Created publish package at " + packageDir +"\n");	
});

var target = Argument("target", "Publish");
RunTarget(target);
