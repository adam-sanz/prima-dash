import { describe, it, expect } from 'vitest';
import { enrichUsers } from './enrichUsers';
import type { DummyJSONUser } from '../types/user.types';

describe('enrichUsers', () => {
  const mockDummyJSONUser: DummyJSONUser = {
    id: 1,
    firstName: 'Adam',
    lastName: 'Bobza',
    maidenName: '',
    age: 30,
    gender: 'male',
    email: 'adam.bobza@test.com',
    phone: '+44 333 333 333',
    username: 'adamb',
    password: 'password123',
    birthDate: '14-04-2014',
    image: 'https://an-image.com',
    bloodGroup: 'O+',
    height: 180,
    weight: 75,
    eyeColor: 'Blue',
    hair: {
      color: 'Brown',
      type: 'Straight',
    },
    ip: '192.168.1.1',
    address: {
      address: 'Plow Lane`',
      city: 'Exeter',
      state: 'Exeter',
      stateCode: 'EX',
      postalCode: 'EX61 F4A',
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
      country: 'United Kingdom',
    },
    macAddress: '00:00:00:00:00:00',
    university: 'University',
    bank: {
      cardExpire: '12/25',
      cardNumber: '4444444444444',
      cardType: 'Visa',
      currency: 'GBP',
      iban: 'US123456789',
    },
    company: {
      department: 'Engineering',
      name: 'Tech',
      title: 'Engineer',
      address: {
        address: 'Tech Avenue',
        city: 'City',
        state: 'EX',
        stateCode: 'EX',
        postalCode: 'EX61 F4A',
        coordinates: {
          lat: 37.7749,
          lng: -122.4194,
        },
        country: 'United Kingdom',
      },
    },
    ein: '12-3456789',
    ssn: '123-45-6789',
    userAgent: 'Mozilla/5.0',
    crypto: {
      coin: 'Bitcoin',
      wallet: '0x123abc',
      network: 'Ethereum',
    },
    role: 'admin',
  };

  it('should combine firstName and lastName into name', () => {
    const result = enrichUsers([mockDummyJSONUser]);
    expect(result[0].name).toBe('Adam Bobza');
  });

  it('should map role correctly for admin', () => {
    const adminUser = { ...mockDummyJSONUser, role: 'admin' };
    const result = enrichUsers([adminUser]);
    expect(result[0].role).toBe('Admin');
  });

  it('should map role correctly for moderator to Editor', () => {
    const moderatorUser = { ...mockDummyJSONUser, role: 'moderator' };
    const result = enrichUsers([moderatorUser]);
    expect(result[0].role).toBe('Editor');
  });

  it('should map unknown roles to Viewer', () => {
    const unknownUser = { ...mockDummyJSONUser, role: 'user' };
    const result = enrichUsers([unknownUser]);
    expect(result[0].role).toBe('Viewer');
  });

  it('should assign status deterministically', () => {
    const users = Array(5)
      .fill(null)
      .map((_, i) => ({ ...mockDummyJSONUser, id: i + 1 }));

    const result = enrichUsers(users);

    expect(result[0].status).toBe('inactive');
    expect(result[1].status).toBe('active');
    expect(result[4].status).toBe('inactive');
  });

  /* TODO: Add tests for address and company field mapping */
  /* TODO: Add tests for handling missing/null company data */
  /* TODO: Add tests for case-insensitive role mapping */
});
