create database PruebaTecnica;
use PruebaTecnica;


-- Eliminar le modelo
drop table movimiento;
drop table transaccion;
drop table tarjeta;
drop table cuenta;

create table cuenta(
    cuenta_id int not null auto_increment,
    -- Datos personales
    nombres varchar(100) not null,
    apellidos varchar(100) not null,
    dpi varchar(13) not null unique,
    telefono varchar(13) not null,
    -- Informacion del usuario
    usuario varchar(100) not null unique,
    pwd varchar(100) not null,

    estado boolean not null default false,
    primary key (cuenta_id)
);

create table tarjeta(
    tarjeta_id int not null auto_increment,
    numero varchar(15) not null,
    cvc int not null,
    nombre_titular varchar(150) not null,
    mes_vencimiento int not null,
    anio_vencimiento int not null,
    cuenta_id int not null,
    primary key (tarjeta_id),
    foreign key (cuenta_id) references cuenta(cuenta_id)
);

create table transaccion(
    transaccion_id int not null auto_increment,
    tarjeta_id int not null,
    monto decimal(10,6) not null,
    descripcion varchar(150),
    fecha datetime not null default current_timestamp(),
    tipo enum('retiro', 'compra', 'otro') not null,
    primary key (transaccion_id),
    foreign key (tarjeta_id) references tarjeta(tarjeta_id)
);

create table movimiento(
    movimiento_id int not null auto_increment,
    tarjeta_id_origen int not null,
    tarjeta_id_destino int not null,
    monto decimal(10,6) not null check (monto > 0),
    fecha datetime not null default current_timestamp(),
    descripcion varchar(200),
    primary key (movimiento_id),
    foreign key (tarjeta_id_origen) references tarjeta(tarjeta_id),
    foreign key (tarjeta_id_destino) references tarjeta(tarjeta_id)
);


-- Información de Relleno
INSERT INTO tarjeta (numero, cvc, nombre_titular, mes_vencimiento, anio_vencimiento, cuenta_id)
VALUES
('4539876543210123', 123, 'Leonardo Martínez', 12, 2026, 1),
('4716123456789012', 456, 'Ana López', 6, 2025, 1),
('5429876543210987', 789, 'Carlos Pérez', 9, 2027, 2),
('6011123456789010', 321, 'María Gómez', 11, 2024, 2);