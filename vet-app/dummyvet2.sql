DROP DATABASE IF EXISTS DUMMYVET2;
CREATE DATABASE DUMMYVET2; 
USE DUMMYVET2;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id                  integer AUTO_INCREMENT not null,
    username            VARCHAR(30),
    active                boolean,
    email               VARCHAR(30),
    activationDate      VARCHAR(30),
    password            VARCHAR(200) not null,


    primary key (id)
);



INSERT INTO Users (id, username, active, email, password, activationDate)
VALUES
(1, 'admin', true, "test@test.test", "$2a$10$paOCw4c78f//fcwDYpyTTOOJ7.OoCTV1BI0iXmLuCCTCyfe6zqvL6", '2021-03-04'),
(2, 'aca', true, "test2@test.test", "$2a$10$paOCw4c78f//fcwDYpyTTOOJ7.OoCTV1BI0iXmLuCCTCyfe6zqvL6", '2021-03-05'),
(3, 'aht', true, "test3@test.test", "$2a$10$paOCw4c78f//fcwDYpyTTOOJ7.OoCTV1BI0iXmLuCCTCyfe6zqvL6", '2021-03-06'),
(4, 'student', true, "test3@test.test", "$2a$10$paOCw4c78f//fcwDYpyTTOOJ7.OoCTV1BI0iXmLuCCTCyfe6zqvL6", '2021-03-06'),
(5, 'tt', true, "test3@test.test", "$2a$10$paOCw4c78f//fcwDYpyTTOOJ7.OoCTV1BI0iXmLuCCTCyfe6zqvL6", '2021-03-06');

DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
    user_id            integer,
    role_id            integer
    );

INSERT INTO user_roles (user_id, role_id)
VALUES
(1, 2),
(2, 6),
(3, 4),
(4, 5),
(5, 3);

DROP TABLE IF EXISTS Roles;
CREATE TABLE Roles (
	id 		integer AUTO_INCREMENT,
    name	VARCHAR(200),
    
    primary key(id)
);

INSERT INTO Roles (id, name)
VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN'),
(3, 'ROLE_TEACHING_TECHNICIAN'),
(4, 'ROLE_ANIMAL_HEALTH_TECHNICIAN'),
(5, 'ROLE_STUDENT'),
(6, 'ROLE_ANIMAL_CARE_ATTENDANT');   

DROP TABLE IF EXISTS Animals;
CREATE TABLE Animals (
    animalId           integer AUTO_INCREMENT not null,
    species             VARCHAR(30),
    weight              integer,
    tattooNum           integer,
    cityTattoo          VARCHAR(30),
    birthDate           VARCHAR(30),
    breed               VARCHAR(30),
    sex                 VARCHAR(30),
    rfid                long,
    microchip           long,
    theStatus           VARCHAR(30),
    diet                VARCHAR(30),
    region              VARCHAR(30),
    subspecies          VARCHAR(30),
    distinguishingFeatures   VARCHAR(30),
    color               VARCHAR(30),
    requestedBy					VARCHAR(30) Default 'None',
    approvalStatus     	VARCHAR(30) Default 'None',
    requestStatus       VARCHAR(30) Default 'None',
    animalName 					VARCHAR(30),
        
    primary key (animalId)
);

INSERT INTO Animals (animalId, species, weight, tattooNum, cityTattoo, birthDate, breed, sex, rfid, microchip, theStatus, diet, region, subspecies, distinguishingFeatures, color, requestedBy, animalName)
VALUES
('1', 'Dog', 13, 234234, 'HOC London', '018-02-29', 'Beagle', 'F', 17, 20, 'Available', null, null, null, 'Loves Treats', 'Brown', 'None',  "Fido"),
('2', 'Dog', 32, 552278, 'HOC Paris', '2018-02-29', 'Pitbull', 'M', 30, 40, 'Available', null, null, null, "Barks a lot", "White",  'None',  "Barney"),
('3', 'Dog', 13, 456113, 'CBH India', '2018-02-29', 'Great Dane', 'M', 50, 60, 'Sick', 'Available', 'Spain', 'Taurus', null, null,  'None', "Pluto"),
('4', 'Cat', 4, 568552, 'CBH India', '2018-02-29', 'Persian', 'F', 50, 60, 'Available', 'Available', 'Spain', 'Taurus', null, null,  'None', "Tinkles"),
('5', 'Cat', 6, 867322, 'CBH India', '2018-02-29', 'Siamese', 'M', 50, 60, 'Sick', 'Available', 'Spain', 'Taurus', null, null,  'None', "Mr Whiskers"),
('6', 'Cat', 7, 124699, 'CBH India', '2018-02-29', 'Munchkin', 'F', 50, 60, 'Sick', 'Available', 'Spain', 'Taurus', null, null,  'None',  "Ms Meow"),
('7', 'Horse', 103, 910112, 'HOC Paris', '2018-11-18', 'Arabian', 'M', 30, 40, 'Available', null, null, null, "barks a lot", "White",  'None', "Sea Biscuit"),
('8', 'Horse', 105, 345666, 'CBH India', '2018-02-29', 'Thoroghbred', 'M', 50, 60, 'Sick', 'Available', 'Spain', 'Taurus', null, null,  'None', "Red Racer"),
('9', 'Horse', 119, 128889, 'CBH India', '2018-02-29', 'Mustang', 'M', 50, 60, 'Sick', 'Available', 'Spain', 'Taurus', null, null,  'None', "Horsey"),
('10', 'Cow', 113, 777221, 'HOC Paris', '2018-02-29', 'Hereford', 'M', 30, 40, 'Available', null, null, null, "barks a lot", "White",  'None', "Carlos"),
('11', 'Cow', 134, 900003, 'CBH India', '2018-02-29', 'Galloway', 'F', 50, 60, 'Sick', 'Available', 'Spain', 'Taurus', null, null,  'None', "Sammy"),
('12', 'Cow', 135, 981733, 'CBH India', '2018-02-29', 'Simmental', 'M', 50, 60, 'Sick', 'Available', 'Spain', 'Taurus', null, null,  'None',  "Brian");

DROP TABLE IF EXISTS AnimalStatus;
CREATE TABLE AnimalStatus (
    statusId           integer AUTO_INCREMENT not null,
    animalId           integer,
    theDate            VARCHAR(30),
    theDescription     VARCHAR(30),
    location           VARCHAR(30),
    theStatus          VARCHAR(30),

    primary key (statusId),
    foreign key (animalId) references Animals(animalId)
);

INSERT INTO AnimalStatus (statusId, animalId, theDate, theDescription, location, theStatus)
VALUES
('1', '1','2021-12-12', null, 'Campus', 'Available'),
('2', '2','2021-11-01', 'Her foot is injured', 'Clinic', 'Injured'),
('3', '3','2021-11-01', 'Her foot is injured', 'Barn', 'Available'),
('4', '4','2021-11-01', 'Her foot is injured', 'Campus', 'Available'),
('5', '5','2021-11-01', 'Her foot is injured', 'Sick', 'Clinic'),
('6', '6','2021-11-01', 'Her foot is injured', 'Campus', 'Available'),
('7', '7','2021-11-01', 'Her foot is injured', 'Farm', 'Unavailable'),
('8', '8','2021-11-01', 'Her foot is injured', 'Barn', 'Available'),
('9', '9','2021-11-01', 'Her foot is injured', 'Barn', 'Sick'),
('10', '10','2021-11-01', 'Her foot is injured', 'Farm', 'Available'),
('11', '11','2021-11-01', 'Her foot is injured', 'Farm', 'Available'),
('12', '12','2021-11-01', 'Her foot is injured', 'Barn', 'Unavailable');

DROP TABLE IF EXISTS AnimalStatusImages;
CREATE TABLE AnimalStatusImages (
    imageId            integer AUTO_INCREMENT not null,
    animalId           integer,
    statusHistory      integer,
    
    primary key (imageId),
    foreign key (animalId) references Animals(animalId)
);

INSERT INTO AnimalStatusImages(imageId, animalId, statusHistory)
VALUES
(1, 2, 1),
(2, 2, 2);


DROP TABLE IF EXISTS ExampleHistory;
CREATE TABLE ExampleHistory (
    recordId            integer,
    theDate            VARCHAR(30),
    measurement        VARCHAR(30),
    theValue           VARCHAR(30),
    theUser            integer,
    animal              integer,
    
    primary key (recordId),
    foreign key (animal) references Animals(animalId),
    foreign key (theUser) references Users(id)
);

INSERT INTO ExampleHistory (recordId, theDate, measurement, theValue, theUser, animal)
VALUES
('1','2019-04-01', 'weight', null, '2', '1'),
('2','2019-04-26', 'blood concentration', null, '3', '1');

DROP TABLE IF EXISTS Images;
CREATE TABLE Images(
    imageId            integer AUTO_INCREMENT not null,
    userId            integer,
    creationDate         VARCHAR(30),
    theFile                VARCHAR(30),
    animalId            integer,
    theType            VARCHAR(30),
    
    primary key (imageId),
    foreign key (userId) references Users(id),
    foreign key (animalId) references Animals(animalId)
);

INSERT INTO Images (imageId, userId, creationDate, theFile, animalId, theType)
VALUES
('1','1', '2021-03-08', 'dog1.jpg', '1', 'Profile'),
('2','2', '2021-03-09', 'dog2.jpg', '2', 'Profile'),
('3','1', '2021-03-08', 'dog3.jpg', '3', 'Profile'),
('4','2', '2021-03-09', 'cat1.jpg', '4', 'Profife'),
('5','1', '2021-03-08', 'cat2.jpg', '5', 'Profile'),
('6','2', '2021-03-09', 'cat3.jpg', '6', 'Profile'),
('7','1', '2021-03-08', 'horse1.jpg', '7', 'Profile'),
('8','2', '2021-03-09', 'horse2.jpg', '8', 'Profile'),
('9','2', '2021-03-09', 'horse3.jpg', '9', 'Profile'),
('10','1', '2021-03-08', 'cow1.jpg', '10', 'Profile'),
('11','2', '2021-03-09', 'cow2.jpg', '11', 'Profile'),
('12','2', '2021-03-09', 'cow3.jpg', '12', 'Profile');



DROP TABLE IF EXISTS TheComment;
CREATE TABLE TheComment (
    commentId           integer AUTO_INCREMENT not null,
    userId              integer,
    theDate                varchar(30),
    username            varchar(30),
    animalId            integer,
    theDescription      varchar(30),
    
    primary key (commentId),
    foreign key (animalId) references Animals(animalId),
    foreign key (userId) references Users(id)
);

INSERT INTO TheComment(commentId, userId, animalId, username, theDescription)
VALUES
(1, 1, 1, 'test-user', "He's ill."),
(2, 1, 1, 'test-user2', "She's hurt."),
(3, 1, 4, 'test-user2', "He needs some milk.");


DROP TABLE IF EXISTS TreatmentMethod;
CREATE TABLE TreatmentMethod (
    treatmentId        integer AUTO_INCREMENT not null,
    theType            varchar(30),
    primary key (treatmentId)
);

INSERT INTO TreatmentMethod(treatmentId, theType)
VALUES
(1, "Physical exam"),
(2, "Blood work"),
(3,	'Bordetella vaccine'),
(4,	'Dental cleaning'),
(5,	'Deworming'),
(6,	'Rabies Vaccination'),
(7,	'Chemo Treatment');


DROP TABLE IF EXISTS PrescriptionRecords;
CREATE TABLE PrescriptionRecords(
    scriptRecord       integer AUTO_INCREMENT not null,
    userId             integer not null,
    animalId           integer not null,
    theDate            varchar(30),
    instructions       varchar(30),
    drugId             varchar(30),
    dosage             varchar(30),
    deliveryMethod     varchar(30),
    drugName           varchar(30),
    treatmentMethodId  integer not null,
    
    primary key (scriptRecord),
    foreign key (userId) references Users(id),
    foreign key (animalId) references Animals(animalId),
    foreign key (treatmentMethodId) references TreatmentMethod(treatmentId)
);

INSERT INTO PrescriptionRecords(scriptRecord, userId, animalId, theDate, instructions, drugId, dosage, deliveryMethod, drugName, treatmentMethodId)
VALUES
(1, 3, 1, "08/12/2020", "for noisy pups", 0, "18 mg", "Oral", "Bark-Less", 1),
(2, 3, 1, "08/12/2020", "for sick dogs", 0, "30 mg", "Oral", "Cough-Less", 1),
(3, 3, 2, "01/10/2021",null, null, null, null, null, 3),
(4, 3, 2, "01/10/2021", null, null, null, null, null, 3);


DROP TABLE IF EXISTS Alerts;
CREATE TABLE Alerts(
    alertId     	integer AUTO_INCREMENT not null,
    userId             integer not null,
    animalId           integer not null,
    priority           varchar(30),
    message       	   varchar(60),
    location           varchar(30),
    
    primary key (alertId),
    foreign key (userId) references Users(id),
    foreign key (animalId) references Animals(animalId)
);

INSERT INTO Alerts(alertId, userId, animalId, priority, message, location)
VALUES
(1, 3, 1, "High", "Please get this dog some help", "On Campus"),
(2, 2, 1, "Low", "Check on this dog's ear","On Campus"),
(3, 2, 11, "Medium", "Walking with a limp", "Barn"),
(4, 3, 9, "Low", "Hoofing too loudly", "Barn");
 


DROP TABLE IF EXISTS MedicalRecordsType;
CREATE TABLE MedicalRecordsType (
    id               integer not null,
    type             varchar(30),
   
    primary key (id)
);

INSERT INTO MedicalRecordsType(id, type)
VALUES
(1,   'XRAY'),
(2,   'DICOm'),
(3,   'SOAP'),
(4,   'FORM'),
(5,   'IMAGE'),
(6,   'NOTE'),
(7,   'LAB'),
(8,   'LINK'),
(9,   'RECHECKS'),
(10,  'DX'),
(11,  'SURGERY'),
(12,  'XRAY'),
(13,  'TRANSFERS'),
(14,  'STUDENT SOAP'),
(15,  'PROB'),
(16,  'INVOICE'),
(17,  'PRODUCT NOTE');