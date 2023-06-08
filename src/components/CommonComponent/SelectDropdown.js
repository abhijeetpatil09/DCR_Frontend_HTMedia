import { Select, Tag } from "antd";
import React from "react";
const { Option } = Select;

const SelectDropdown = ({
  title,
  name,
  value,
  setValue,
  mode,
  placeholder,
  defaultValue,
  disabledSet,
  loader,
  data,
}) => {
  const disableSet = new Set(disabledSet);

  const handleChange = (value) => {
    const empty = value?.length > 0 && value?.includes("all");
    if (empty) {
      if (value?.length > 1 && value[0] === "all") {
        value?.splice(0, 1);
        setValue(value, name);
      } else {
        setValue(["all"], name);
      }
    } else {
      setValue(value, name);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <label className="bg-transparent block w-full text-amaranth-600  bg-blend-darken sm:text-sm sm:leading-6">
        {title}
      </label>
      <Select
        defaultValue={defaultValue}
        value={value}
        mode={mode}
        size="large"
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        loading={loader}
        tagRender={(props) => {
          const { label, closable, onClose } = props;
          return (
            <Tag
              className="flex items-center rounded-lg flex-row py-0.5 px-2 bg-amaranth-100 text-amaranth-900 border-none"
              style={{
                margin: "5px 4px",
                fontWeight: "500",
              }}
              closable={closable}
              onClose={onClose}
            >
              {label}
            </Tag>
          );
        }}
        className="customSelector border rounded-lg overflow-auto"
      >
        {data?.map((item, key) => {
          return (
            <Option
              key={key}
              value={item?.value}
              title={"location"}
              className="text-amaranth-600"
              disabled={disableSet.has(item?.value)}
            >
              {item.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectDropdown;
