//STEP THREE
export type OriginalInstanceObject = {
  [key: string]: string | Media[];
};

export type FormattedInstanceObject = {
  instance_description: string;
  instance_media: Media[];
};

export const formatInstanceData = (
  data: OriginalInstanceObject
): FormattedInstanceObject[] => {
  const formattedData: FormattedInstanceObject[] = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // Check if the key is an instance description
      if (key.includes("description")) {
        const instanceNumber = key.split("_")[1]; // Extract the instance number
        const description = data[key] as string;
        const mediaKey = `instance_${instanceNumber}_media`;
        const media = data[mediaKey] as Media[];

        // Push the formatted object to the array
        formattedData.push({
          instance_description: description,
          instance_media: media,
        });
      }
    }
  }

  return formattedData;
};

export const reverseFormatInstanceData = (
  data: FormattedInstanceObject[]
): OriginalInstanceObject => {
  const originalData: OriginalInstanceObject = {};

  data.forEach((item, index) => {
    const instanceNumber = index + 1;
    originalData[`instance_${instanceNumber}_description`] =
      item.instance_description;
    originalData[`instance_${instanceNumber}_media`] = item.instance_media;
  });

  return originalData;
};

// STEP FIVE

export const convertObjectToInventorArray = (
  obj: Record<string, string>
): ProductInventor[] => {
  const result: ProductInventor[] = [];
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    const [prefix, numStr, field] = key.split("_");
    const num = parseInt(numStr, 10);

    if (!isNaN(num) && field) {
      const index = num - 1;

      if (!result[index]) {
        result[index] = {
          inventor_contact: "",
          inventor_email: "",
          inventor_name: "",
        };
      }

      if (field === "contact") {
        result[index].inventor_contact = obj[key];
      } else if (field === "email") {
        result[index].inventor_email = obj[key];
      } else if (field === "name") {
        result[index].inventor_name = obj[key];
      }
    }
  });

  return result;
};

export const reverseArrayToInventorObject = (
  arr: ProductInventor[]
): Record<string, string> => {
  const result: Record<string, string> = {};

  arr.forEach((item, index) => {
    result[`inventor_${index + 1}_contact`] = item.inventor_contact;
    result[`inventor_${index + 1}_email`] = item.inventor_email;
    result[`inventor_${index + 1}_name`] = item.inventor_name;
  });

  return result;
};

// STEP SIX

export const convertObjectToSupplierArray = (
  obj: Record<string, string>
): ProductSupplier[] => {
  const result: ProductSupplier[] = [];
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    const [prefix, numStr, field] = key.split("_");
    const num = parseInt(numStr, 10);

    if (!isNaN(num) && field) {
      const index = num - 1;

      if (!result[index]) {
        result[index] = {
          supplier_contact: "",
          supplier_email: "",
          supplier_name: "",
        };
      }

      if (field === "contact") {
        result[index].supplier_contact = obj[key];
      } else if (field === "email") {
        result[index].supplier_email = obj[key];
      } else if (field === "name") {
        result[index].supplier_name = obj[key];
      }
    }
  });

  return result;
};

export const reverseArrayToSupplierObject = (
  arr: ProductSupplier[]
): Record<string, string> => {
  const result: Record<string, string> = {};

  arr.forEach((item, index) => {
    result[`supplier_${index + 1}_contact`] = item.supplier_contact;
    result[`supplier_${index + 1}_email`] = item.supplier_email;
    result[`supplier_${index + 1}_name`] = item.supplier_name;
  });

  return result;
};
