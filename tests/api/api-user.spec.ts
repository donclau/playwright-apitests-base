import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { attachment } from 'allure-js-commons';

import { BASE_URL } from '../../config/env';
import { apiRequest } from '../../utils/apiClient';
import { measure } from '../../utils/timer';
import { validateSchema } from '../../utils/validator';

const dataPath = path.join(__dirname, '../../data/users/users.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test.describe.configure({ mode: 'parallel' });

for (const tcase of testData) {

  test(`${tcase.tag || ''} ${tcase.name}`, async ({ request }) => {

    // 🔥 payload dinámico
    let payload = { ...tcase.payload };

    if (payload.email === 'dynamic') {
      payload.email = `test_${Date.now()}@test.com`;
    }

    const url = `${BASE_URL}${tcase.endpoint}`;

    const { response, duration } = await measure(() =>
      apiRequest({
        request,
        method: tcase.method,
        url,
        data: payload
      })
    );

    // 🧱 status
    expect(response.status()).toBe(tcase.expected.status);

    // ⚡ performance
    if (tcase.expected.maxResponseTime) {
      expect(duration).toBeLessThan(tcase.expected.maxResponseTime);
    }

    // 🔍 si hay body
    if (response.status() !== 204) {

      let body: any;

      try {
        body = await response.json();
      } catch {
        body = await response.text();
      }

      // 📎 Allure
      attachment(
        `Response - ${tcase.name}`,
        JSON.stringify(body, null, 2),
        'application/json'
      );

      // 🧬 contract
      if (tcase.expected.schema) {
        validateSchema(tcase.expected.schema, body);
      }

      // 📊 data integrity
      if (tcase.expected.validateResponse) {
        expect(body.email).toBe(payload.email);
        expect(body.name).toBe(payload.name);
        expect(body.surname).toBe(payload.surname);
      }
    }

  });

}