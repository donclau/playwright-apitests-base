import { test, expect } from '@playwright/test';
import { attachment } from 'allure-js-commons';
import { apiRequest } from '../../utils/apiClient';

const githubReposUrl = 'https://api.github.com/users/donclau/repos';

test.describe.configure({ mode: 'parallel' });

test('@test-repo List all GitHub repositories for donclau', async ({ request }) => {
  test.info().annotations.push({ type: 'tag', description: 'test-repo' });

  const response = await apiRequest({
    request,
    method: 'GET',
    url: githubReposUrl,
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  attachment(
    'GitHub repos response',
    JSON.stringify(body, null, 2),
    'application/json'
  );

  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThanOrEqual(0);
});
