import React, { useState } from 'react';
import Select, {
  ControlProps,
  OptionProps,
  MenuProps,
  MultiValueProps,
  NoticeProps,
  Props as ReactSelectProps,
  GroupBase,
  MultiValue,
  SingleValue,
  SelectComponentsConfig,
} from 'react-select';
import { useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Define option type
export interface OptionType {
  label: string;
  value: string;
  [key: string]: any;
}

// Custom components for react-select with proper TypeScript types
const CustomControl = <
  Option extends OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: ControlProps<Option, IsMulti, Group>) => {
  const { children, isFocused } = props;
  const theme = useTheme();

  // Extract only the props safe to pass to a div element
  const { ref, ...safeInnerProps } = props.innerProps;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: 1,
        borderColor: isFocused ? theme.palette.primary.main : theme.palette.divider,
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
        padding: '2px 8px',
        '&:hover': {
          borderColor: theme.palette.text.primary,
        },
      }}
      {...safeInnerProps}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {children}
    </Box>
  );
};

const CustomOption = <
  Option extends OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: OptionProps<Option, IsMulti, Group>) => {
  const { isSelected, isFocused, children, innerProps } = props;

  // Extract only the props that are safe for MenuItem
  // This is the key fix - we're explicitly omitting problematic props
  const { onClick } = innerProps as React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>;

  return (
    <MenuItem
      selected={isSelected}
      sx={{
        fontWeight: isSelected ? 500 : 400,
        backgroundColor: isFocused ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
      }}
      onClick={onClick}
    >
      {children}
    </MenuItem>
  );
};

const CustomMenu = <
  Option extends OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: MenuProps<Option, IsMulti, Group>) => {
  const { children } = props;
  const theme = useTheme();

  // Extract only the props safe to pass to a div element
  const { ref, ...safeInnerProps } = props.innerProps;

  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        marginTop: '4px',
        position: 'absolute',
        width: '100%',
        zIndex: theme.zIndex.modal,
      }}
      {...safeInnerProps}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {children}
    </Paper>
  );
};

const CustomMultiValue = <
  Option extends OptionType,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: MultiValueProps<Option, IsMulti, Group>) => {
  const { children, removeProps } = props;
  return (
    <Chip
      label={children}
      size="small"
      onDelete={removeProps.onClick}
      deleteIcon={<CancelIcon fontSize="small" />}
      sx={{ margin: '2px' }}
    />
  );
};

const CustomDropdownIndicator = () => {
  return (
    <ArrowDropDownIcon
      color="action"
      sx={{
        padding: '4px',
        cursor: 'pointer',
      }}
    />
  );
};

const CustomNoOptionsMessage = <
  Option extends OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: NoticeProps<Option, IsMulti, Group>) => {
  const { children } = props;

  // Extract only the props safe to pass to a span element
  const { ref, ...safeInnerProps } = props.innerProps || {};

  return (
    <Typography
      color="text.secondary"
      sx={{ padding: '8px 16px' }}
      {...safeInnerProps}
      ref={ref as React.Ref<HTMLSpanElement>}
    >
      {children}
    </Typography>
  );
};

// Custom styles with proper TypeScript types
const getCustomStyles = (theme: Theme) => ({
  input: (provided: any) => ({
    ...provided,
    color: theme.palette.text.primary,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: theme.palette.text.primary,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: theme.palette.text.secondary,
  }),
});

// Props for our custom component
export interface MuiReactSelectProps<
  Option extends OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<ReactSelectProps<Option, IsMulti, Group>, 'onChange'> {
  onChange?: (
    option: IsMulti extends true ? MultiValue<Option> : SingleValue<Option>
  ) => void;
  options: Option[];
  isMulti?: IsMulti;
  placeholder?: string;
  customComponents?: SelectComponentsConfig<Option, IsMulti, Group>;
}

// The main component with proper TypeScript typing
function MuiReactSelect<
  Option extends OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  options,
  isMulti = false as IsMulti,
  placeholder = "Select...",
  onChange,
  ...props
}: MuiReactSelectProps<Option, IsMulti, Group>) {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<
    IsMulti extends true ? MultiValue<Option> : SingleValue<Option>
  >(null as any);

  const handleChange = (
    option: IsMulti extends true ? MultiValue<Option> : SingleValue<Option>
  ) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <Select<Option, IsMulti, Group>
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isMulti={isMulti}
      placeholder={placeholder}
      components={{
        Control: CustomControl,
        Option: CustomOption,
        Menu: CustomMenu,
        MultiValue: CustomMultiValue,
        DropdownIndicator: CustomDropdownIndicator,
        NoOptionsMessage: CustomNoOptionsMessage,
        ...props.customComponents
      }}
      styles={getCustomStyles(theme)}
      {...props}
    />
  );
}

// Usage example with TypeScript
export const ExampleUsage: React.FC = () => {
  // Define options with the correct type
  const options: OptionType[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  // Type-safe handlers
  const handleSingleChange = (selectedOption: SingleValue<OptionType>) => {
    console.log('Selected:', selectedOption);
  };

  const handleMultiChange = (selectedOptions: MultiValue<OptionType>) => {
    console.log('Selected multiple:', selectedOptions);
  };

  return (
    <Box sx={{ width: 300, margin: '20px auto' }}>
      <Typography variant="h6" gutterBottom>
        Multi Select
      </Typography>
      <MuiReactSelect
        options={options}
        isMulti
        closeMenuOnSelect={false}
        onChange={handleMultiChange}
      />
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Custom Components Select
      </Typography>
      <MuiReactSelect
        options={[
          {
            value: '1',
            label: 'Option 1',
            amount: 15,
          },
          {
            value: '2',
            label: 'Option 2',
            amount: 10,
          }
        ]}
        isMulti
        formatOptionLabel={(option) => `${option.label} (${option.amount})`}
        customComponents={{
          MultiValue: (props) => {
            const { data } = props;
            const { label } = data;
            return (
              <CustomMultiValue  {...props}>
                {label}
              </CustomMultiValue>
            )
          }
        }}
        closeMenuOnSelect={false}
        onChange={handleMultiChange}
      />
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Single Select
      </Typography>
      <MuiReactSelect
        options={options}
        onChange={handleSingleChange}
      />
    </Box>
  );
};

export default MuiReactSelect;