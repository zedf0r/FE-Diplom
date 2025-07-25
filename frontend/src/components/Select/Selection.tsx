import { ConfigProvider, Select } from "antd";
import "antd/dist/reset.css";

type TypeSelectOption = {
  value: string;
  label: string;
};

export const Selection = ({ placeholder }: { placeholder: string }) => {
  const options = [
    {
      value: "1",
      label: "Ангарск",
    },
    {
      value: "2",
      label: "Архангельск",
    },
    {
      value: "3",
      label: "Астрахань",
    },
    {
      value: "4",
      label: "Барнаул",
    },
    {
      value: "5",
      label: "Белгород",
    },
    {
      value: "6",
      label: "Благовещенск",
    },
    {
      value: "7",
      label: "Братск",
    },
    {
      value: "8",
      label: "Брянск",
    },
    {
      value: "9",
      label: "Великий Новгород",
    },
  ];
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            borderRadius: 5,
            optionSelectedBg: "#6cbbf7ff",
          },
        },
      }}
    >
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={placeholder}
        optionFilterProp="label"
        filterSort={(optionA: TypeSelectOption, optionB: TypeSelectOption) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={options}
      />
    </ConfigProvider>
  );
};
