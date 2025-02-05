import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Param,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
 
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('register')
  async register(@Body() patientData: any) {
    try {
      const { token } = await this.loginService.register(patientData);
      return { message: 'Registration successful', token };
    } catch (error) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }
 
  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    try {
      const result = await this.loginService.validatePatient(email, password);
      if (!result)
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      return { message: 'Login successful', token: result.token };
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.BAD_REQUEST);
    }
  }
 
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Param('id') id: number, @Body() updatedData: any) {
    try {
      const updatedPatient = await this.loginService.updatePatient(
        id,
        updatedData,
      );
      return { message: 'Profile updated', data: updatedPatient };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
 
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req) {
    return this.loginService.getPatientById(req.user.id);
  }
 
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPatientById(@Param('id') id: number, @Request() req) {
    if (req.user.id !== id)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
 
    const patient = await this.loginService.getPatientById(id);
    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
 
    return { data: patient }; 
  }
}