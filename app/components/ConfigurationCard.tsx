import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageConfig } from "../types";

interface ConfigurationCardProps {
  config: ImageConfig;
  onChange: (config: ImageConfig) => void;
}

export function ConfigurationCard({ config, onChange }: ConfigurationCardProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              value={config.width || ''}
              onChange={(e) => onChange({ ...config, width: Number(e.target.value) || undefined })}
              placeholder="Auto"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              value={config.height || ''}
              onChange={(e) => onChange({ ...config, height: Number(e.target.value) || undefined })}
              placeholder="Auto"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Select value={config.format} onValueChange={(value: 'png' | 'jpeg' | 'webp') => onChange({ ...config, format: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG (Transparent)</SelectItem>
              <SelectItem value="jpeg">JPEG (Better compression)</SelectItem>
              <SelectItem value="webp">WebP (Modern format)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quality">Quality</Label>
          <Select value={String(config.quality)} onValueChange={(value) => onChange({ ...config, quality: Number(value) })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.8">Low - 80%</SelectItem>
              <SelectItem value="0.9">Medium - 90%</SelectItem>
              <SelectItem value="1">High - 100%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="scale">Scale</Label>
          <Select value={String(config.scale)} onValueChange={(value) => onChange({ ...config, scale: Number(value) })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="2">2x</SelectItem>
              <SelectItem value="3">3x</SelectItem>
              <SelectItem value="4">4x</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="background">Background</Label>
          <Input
            id="background"
            type="text"
            value={config.background}
            onChange={(e) => onChange({ ...config, background: e.target.value })}
            placeholder="transparent"
          />
        </div>
      </CardContent>
    </Card>
  );
}
