import { Select, Spin } from "antd";
import { GeopositionIcon } from "../Icons";
import { useEffect, useRef, useState } from "react";
import { fetchHelper } from "../../helper/fetchHelper";

type TypeSelectOption = {
  value: string;
  label: string;
};

type TypeCityParams = {
  _id: string;
  name: string;
};

export const Selection = ({
  placeholder,
  handleSetCity,
  value,
}: {
  placeholder: string;
  handleSetCity: (id: string, city: string) => void;
  value: string;
}) => {
  const [options, setOptions] = useState<TypeSelectOption[]>([]);
  const [searchText, setSearchText] = useState("");

  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number | null | NodeJS.Timeout>(null);

  const responseData = async (search: string) => {
    if (search.trim().length === 0) {
      setOptions([]);
      return;
    }

    try {
      setLoading(true);

      const data = await fetchHelper({
        method: "GET",
        url: `/routes/cities?name=${search}`,
      });

      const formattedData = data.map((city: TypeCityParams) => ({
        value: city._id,
        label: city.name.toLocaleUpperCase(),
      }));

      setOptions(formattedData);
    } catch (error) {
      setOptions([]);
      throw new Error(`Ошибка получения городов: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      responseData(searchText);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchText]);

  return (
    <Select
      showSearch
      filterOption={false}
      suffixIcon={<GeopositionIcon />}
      style={{ width: "50%", borderRadius: 5, height: 60, fontSize: 18 }}
      placeholder={placeholder}
      optionFilterProp="label"
      onSearch={(value: string) => setSearchText(value)}
      onChange={(value: string) => {
        const city = options.find((o) => o.value === value)?.label || "";
        handleSetCity(value, city);
      }}
      options={options}
      notFoundContent={loading ? <Spin /> : "Нет результатов"}
      loading={loading}
      value={value === "" ? null : value}
    />
  );
};
