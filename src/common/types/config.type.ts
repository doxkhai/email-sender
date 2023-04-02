type PrimitiveTypes = string | number | boolean;

export type ConfigPropertyType = ConfigType | PrimitiveTypes

export type ConfigType = {
    [key: string]: ConfigPropertyType | ConfigPropertyType[];
}