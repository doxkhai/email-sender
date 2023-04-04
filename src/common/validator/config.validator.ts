import { ConfigType } from "../types/config.type";

let i = 0;

const logConfigError = ({
  failedConfig,
  failedProperty,
}: {
  failedConfig: ConfigType;
  failedProperty: string;
}) => {
  console.error(`Failed validation: ${i++}`, {
    failedConfig,
    failedProperty,
    failedValue: failedConfig[failedProperty],
  });
};

export const configValidator = (config: ConfigType): Boolean => {
  return config
    ? Object.keys(config)
        .map((key) => {
          if (!config[key]) {
            logConfigError({ failedConfig: config, failedProperty: key });
            return false;
          }
          if (typeof config[key] !== "object") return true;

          if (Array.isArray(config[key])) {
            const res = (config[key] as ConfigType[])
              .map((e) => configValidator(e))
              .every(Boolean);
            if (!res)
              logConfigError({ failedConfig: config, failedProperty: key });
            return res;
          }

          return configValidator(config[key] as ConfigType);
        })
        .every(Boolean)
    : false;
};
