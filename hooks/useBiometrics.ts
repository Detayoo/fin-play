import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export const useBiometrics = () => {
  const [isBiometricSupported, setBiometricSupported] = useState<
    boolean | null
  >(null);
  const [isBiometricType, setBiometricType] =
    useState<LocalAuthentication.AuthenticationType | null>(null);
  const [supportedTypes, setSupportedTypes] = useState<
    LocalAuthentication.AuthenticationType[]
  >([]);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then((isSupported: any) => {
      setBiometricSupported(isSupported);

      if (isSupported) {
        LocalAuthentication.supportedAuthenticationTypesAsync().then(
          (types: any) => {
            setSupportedTypes(types);
            if (
              types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
            ) {
              setBiometricType(
                LocalAuthentication.AuthenticationType.FINGERPRINT
              );
            } else if (
              types.includes(
                LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
              )
            ) {
              setBiometricType(
                LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
              );
            } else if (
              types.includes(LocalAuthentication.AuthenticationType.IRIS)
            ) {
              setBiometricType(LocalAuthentication.AuthenticationType.IRIS);
            }
          }
        );
      }
    });
  }, []);

  return {
    supportedTypes,
    isBiometricType,
    isBiometricSupported,
  };
};
