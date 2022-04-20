import {
  AuditOutlined,
  CarryOutOutlined,
  BookOutlined,
  CompassOutlined,
  CommentOutlined,
  ToolOutlined,
  BankOutlined
} from '@ant-design/icons';

export const solicitudes = [];
export const usuarios = [
  {
    id: 1,
    nombreUsuario: 'accarbonell',
    email: 'accarbonell1987@gmail.com',
    confirmado: true,
    uo: 1,
    password: 'secret',
    persona: { id: 1, nombre: 'Alberto Carlos', apellido: 'Carbonell Marcé', cargo: 'IngInformatico' },
    rol: 1
  },
  {
    id: 2,
    nombreUsuario: 'icarbonello',
    email: 'icarbonello2022@gmail.com',
    confirmado: true,
    uo: 0,
    password: 'secret',
    persona: { id: 2, nombre: 'Isabella', apellido: 'Carbonell Ochoa', cargo: 'IngInformatico' },
    rol: 2
  }
];
export const roles = [
  {
    icon: <AuditOutlined />,
    nombre: 'Master Admin',
    selectable: false,
    permisos: ['all']
  },
  {
    icon: <CarryOutOutlined />,
    nombre: 'Administrador Aplicacion',
    selectable: true,
    permisos: ['all']
  },
  {
    icon: <BookOutlined />,
    nombre: 'Jefe de Proyecto',
    selectable: true,
    permisos: ['']
  },
  {
    icon: <CompassOutlined />,
    nombre: 'Invitado',
    selectable: true,
    permisos: ['']
  },
  { icon: <CommentOutlined />, nombre: 'Coordinador', selectable: true, permisos: [''] },
  { icon: <ToolOutlined />, nombre: 'Especialista', selectable: true, permisos: [''] },
  { icon: <BankOutlined />, nombre: 'Directivo', selectable: true, permisos: [''] }
];
export const unidadOrganizativa = [
  { id: 1, nombre: 'Santiago de Cuba' },
  { id: 2, nombre: 'Las Tunas' }
];
export const problemas = [];
