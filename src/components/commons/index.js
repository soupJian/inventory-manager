import dynamic from 'next/dynamic'
const Button = dynamic(()=>import('./button'))
const Alert = dynamic(()=>import('./alert'))
const Table = dynamic(()=>import('./table/Table'))
const TableCell = dynamic(()=>import('./table/TableCell'))
const TableRow = dynamic(()=>import('./table/TableRow'))
const Box = dynamic(()=>import('./containers/Box'))
const Icon = dynamic(()=>import('./icons/Icon'))
const Input = dynamic(()=>import('./Input/Input'))
const Checkbox = dynamic(()=>import('./checkbox/Checkbox'))
const Tabs = dynamic(()=>import('./tabs/Tabs'))
const Tab = dynamic(()=>import('./tabs/Tab'))
const Filter = dynamic(()=>import('./filter/Filter'))
const Dropdown = dynamic(()=>import('./dropdown/Dropdown'))
const Pagination = dynamic(()=>import('./pagination/Pagination'))
const MultiSelectDropdown = dynamic(()=>import('./dropdown/MultiSelectDropdown'))
const FloatingBar = dynamic(()=>import('./floatingBar/FloatingBar'))
const Popover = dynamic(()=>import('./popover/Popover'))
const Modal = dynamic(()=>import('./modal/Modal'))
const Backdrop = dynamic(()=>import('./modal/Backdrop'))
const Loader = dynamic(()=>import('./loader/Loader'))
const Dialog = dynamic(()=>import('./dialog/Dialog'))
import {
  BaseButton,
  Wrapper,
  Flex,
  Text,
  Label,
  InputGroup
} from './styled-elements'
export {
  Table,
  TableCell,
  TableRow,
  Button,
  Alert,
  Box,
  Icon,
  Input,
  Checkbox,
  Tabs,
  Tab,
  Filter,
  Dropdown,
  Pagination,
  MultiSelectDropdown,
  Loader,
  Popover,
  Modal,
  Backdrop,
  BaseButton,
  Wrapper,
  Flex,
  FloatingBar,
  Text,
  Label,
  InputGroup,
  Dialog
}
