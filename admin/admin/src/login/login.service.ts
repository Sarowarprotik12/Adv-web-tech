import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './login.entity';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
 
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private readonly registrationRepo: Repository<Login>,
    private readonly jwtService: JwtService,
  ) {}
 
  async register(
    patientData: Partial<Login>,
  ): Promise<{ token: string }> {
    const newRegistration = this.registrationRepo.create({
      ...patientData,
      phoneNumber: patientData.phoneNumber || '',
      nidNumber: patientData.nidNumber || '',
      address: patientData.address || '',
      dateOfBirth: patientData.dateOfBirth || null,
      gender: patientData.gender || '',
    });
 
    const savedPatient = await this.registrationRepo.save(newRegistration);
 
    const payload = { id: savedPatient.id, email: savedPatient.email };
    const token = this.jwtService.sign(payload);
 
    const emailContent = `
      Dear ${savedPatient.name},
      Thank you for registering with us!
      Below are your registration details:
      - Registration ID: ${savedPatient.id}
      - Name: ${savedPatient.name}
      - Email: ${savedPatient.email}
      - Phone Number: ${savedPatient.phoneNumber}
      - NID Number: ${savedPatient.nidNumber}
      - Address: ${savedPatient.address}
      - Date of Birth: ${
        savedPatient.dateOfBirth
          ? new Date(savedPatient.dateOfBirth).toDateString()
          : 'N/A'
      }
      - Gender: ${savedPatient.gender}
      Best regards,
      E-Health Care Services
    `;
 
    await this.sendEmail(
      savedPatient.email,
      'Registration Confirmation',
      emailContent,
    );
    return { token };
  }
  async validatePatient(
    email: string,
    password: string,
  ): Promise<{ token: string } | null> {
    const registration = await this.registrationRepo.findOne({
      where: { email },
    });
 
    if (!registration || registration.password !== password) {
      return null;
    }
 
    const payload = { id: registration.id, email: registration.email };
    const token = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
 
    return { token };
  }
  async updatePatient(
    id: number,
    updatedData: Partial<Login>,
  ): Promise<Login> {
    const patient = await this.registrationRepo.findOne({ where: { id } });
    if (!patient) {
      throw new Error('Patient not found');
    }
 
    Object.assign(patient, updatedData);
    const updatedPatient = await this.registrationRepo.save(patient);
 
    // Ensure dateOfBirth is a Date object before formatting
    const dateOfBirth = new Date(updatedPatient.dateOfBirth);
 
    const emailContent = `
      Dear ${updatedPatient.name},
 
      Your profile has been successfully updated. Here are your updated details:
 
      - Registration ID: ${updatedPatient.id}
      - Name: ${updatedPatient.name}
      - Email: ${updatedPatient.email}
      - Phone Number: ${updatedPatient.phoneNumber}
      - NID Number: ${updatedPatient.nidNumber}
      - Address: ${updatedPatient.address}
      - Date of Birth: ${dateOfBirth.toDateString()} <!-- Fixed here -->
      - Gender: ${updatedPatient.gender}
 
      If any of this information is incorrect, please contact our support team immediately.
 
      Best regards,
      E-Health Care Services
    `;
 
    await this.sendEmail(
      updatedPatient.email,
      'Profile Update Notification',
      emailContent,
    );
 
    return updatedPatient;
  }
  private async sendEmail(email: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sarowarprotik9@gmail.com',
        pass: 'irpn rpzk mupc hmvd',
      },
    });
 
    const mailOptions = {
      from: 'sarowarprotik9@gmail.com',
      to: email,
      subject,
      text,
    };
 
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send email:', error.message);
      throw new Error('Failed to send email');
    }
  }
  async getPatientById(id: number): Promise<Login> {
    const patient = await this.registrationRepo.findOne({ where: { id } });
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient;
  }
 
  async getAllPatients(): Promise<Login[]> {
    return await this.registrationRepo.find();
  }
}