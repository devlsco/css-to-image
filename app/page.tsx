'use client';

import { useState, memo, useCallback, lazy, Suspense, useMemo, useEffect } from "react";
import { html } from "@codemirror/lang-html";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import debounce from 'lodash.debounce';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { templates } from './data/templates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageConfig } from "./types";
import { convertToImage } from './lib/imageUtils';
import { ConfigurationCard } from "./components/ConfigurationCard";
import { Github } from "lucide-react";

const defaultTemplate = templates[0].code;

const defaultConfig: ImageConfig = {
  format: 'png',
  quality: 1,
  scale: 3,
  background: 'transparent'
};

const CodeMirror = lazy(() => import("@uiw/react-codemirror"));

const EditorCard = memo(({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const debouncedOnChange = useMemo(
    () =>
      debounce((value: string) => {
        onChange(value);
      }, 300),
    [onChange]
  );

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <Card className="border-border/50">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-card-foreground">Editor</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <Suspense fallback={<div>Loading editor...</div>}>
          <CodeMirror
            value={value}
            height="350px"
            theme={vscodeDark}
            extensions={[html()]}
            onChange={debouncedOnChange}
            className="rounded-lg overflow-hidden text-sm"
          />
        </Suspense>
      </CardContent>
    </Card>
  );
});
EditorCard.displayName = 'EditorCard';

const Preview = memo(({ htmlCode, style }: { htmlCode: string; style: React.CSSProperties }) => (
  <div
    id="preview-container"
    className="preview-container"
    style={style}
    dangerouslySetInnerHTML={{ __html: htmlCode }}
  />
));
Preview.displayName = 'Preview';

export default function Home() {
  const [htmlCode, setHtmlCode] = useState(defaultTemplate);
  const [config, setConfig] = useState<ImageConfig>(defaultConfig);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = useCallback(async () => {
    const previewContainer = document.getElementById("preview-container");
    if (!previewContainer || isGenerating) return;

    setIsGenerating(true);
    try {
      const originalStyle = {
        width: previewContainer.style.width,
        height: previewContainer.style.height,
        minHeight: previewContainer.style.minHeight
      };

      requestAnimationFrame(() => {
        if (config.width) {
          previewContainer.style.width = `${config.width}px`;
        }
        if (config.height) {
          previewContainer.style.height = `${config.height}px`;
          previewContainer.style.minHeight = `${config.height}px`;
        }
      });

      await new Promise(resolve => requestAnimationFrame(resolve));

      const dataUrl = await convertToImage(previewContainer, config);

      requestAnimationFrame(() => {
        previewContainer.style.width = originalStyle.width;
        previewContainer.style.height = originalStyle.height;
        previewContainer.style.minHeight = originalStyle.minHeight;
      });

      const link = document.createElement("a");
      link.download = `css-to-image-${Date.now()}.${config.format}`;
      link.href = dataUrl;
      link.click();
      toast.success("Image downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating, config]);

  const handleCopyToClipboard = useCallback(async () => {
    const element = document.getElementById("preview-container");
    if (!element) return;

    try {
      const dataUrl = await convertToImage(element, {
        ...config,
        format: 'png'
      });

      const blob = await fetch(dataUrl).then(res => res.blob());
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success("Image copied to clipboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy image");
    }
  }, [config]);

  const previewStyle = useCallback(() => ({
    width: config.width ? `${config.width}px` : '100%',
    height: config.height ? `${config.height}px` : 'auto',
    minHeight: config.height ? `${config.height}px` : '300px',
    backgroundColor: config.background === 'transparent' ? 'transparent' : config.background,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }), [config]);

  return (
    <main className="container mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-7xl">
      <div className="flex flex-col items-center space-y-2 text-center px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">CSS to Image</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Convert HTML and CSS to images with Tailwind CSS support
        </p>
        <div className="flex items-center gap-2 mt-2">
          <a
            href="https://github.com/devlsco/css-to-image"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github />
            <span>Open Source on GitHub</span>
          </a>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex flex-col items-center w-full">
            <Tabs defaultValue="editor" className="w-full">
              <div className="flex justify-center w-full mb-2 sm:mb-4">
                <TabsList className="border">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="editor">
                <EditorCard value={htmlCode} onChange={setHtmlCode} />
              </TabsContent>

              <TabsContent value="templates">
                <Card>
                  <CardContent className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 p-4">
                    {templates.map(template => (
                      <Button
                        key={template.id}
                        variant="outline"
                        onClick={() => setHtmlCode(template.code)}
                        className="h-auto p-2 sm:p-4 text-sm sm:text-base"
                      >
                        {template.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <ConfigurationCard
                  config={config}
                  onChange={setConfig}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Card>
          <CardHeader className="p-3 sm:p-6 border-b">
            <CardTitle className="text-lg sm:text-xl">Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="overflow-hidden rounded-lg border p-2 sm:p-4">
              <Preview htmlCode={htmlCode} style={previewStyle()} />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleDownload}
                className="flex-1 text-sm sm:text-base"
                disabled={isGenerating}
                variant="outline"
              >
                {isGenerating ? 'Generating...' : 'Download'}
              </Button>
              <Button
                onClick={handleCopyToClipboard}
                variant="outline"
                className="text-sm sm:text-base"
              >
                Copy to Clipboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
