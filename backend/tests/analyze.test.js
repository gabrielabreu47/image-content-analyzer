const request = require('supertest');
const app = require('../src/index');

describe('GET /api/health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('POST /api/analyze', () => {
  it('returns 400 when no file is provided', async () => {
    const res = await request(app).post('/api/analyze');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 415 for non-image files', async () => {
    const res = await request(app)
      .post('/api/analyze')
      .attach('image', Buffer.from('plain text content'), {
        filename: 'test.txt',
        contentType: 'text/plain',
      });
    expect(res.status).toBe(415);
    expect(res.body.error).toMatch(/Invalid file type/);
  });

  it('returns 413 for files exceeding 10MB', async () => {
    const largeBuffer = Buffer.alloc(11 * 1024 * 1024);
    const res = await request(app)
      .post('/api/analyze')
      .attach('image', largeBuffer, {
        filename: 'large.jpg',
        contentType: 'image/jpeg',
      });
    expect(res.status).toBe(413);
  });
});

describe('POST /api/analyze (with mocked service)', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns tags for a valid image', async () => {
    jest.mock('../src/services/openaiService', () => ({
      analyzeImage: jest.fn().mockResolvedValue({
        tags: [
          { label: 'landscape', confidence: 0.95 },
          { label: 'mountain', confidence: 0.88 },
        ],
      }),
    }));

    const mockedApp = require('../src/index');

    const tinyJpeg = Buffer.from(
      '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM' +
      'EA4QEA4dERMREQ0VFhcWFBYfGhkaHx0fHxf/yQALCAABAAEBAREA/8wABgABAQEBAQAAAAAAAAAAAA' +
      'AAAAEAAv/aAAgBAQAAPwBN/9k=',
      'base64'
    );

    const res = await request(mockedApp)
      .post('/api/analyze')
      .attach('image', tinyJpeg, {
        filename: 'test.jpg',
        contentType: 'image/jpeg',
      });

    expect(res.status).toBe(200);
    expect(res.body.tags).toBeDefined();
    expect(Array.isArray(res.body.tags)).toBe(true);
    expect(res.body.tags[0]).toHaveProperty('label');
    expect(res.body.tags[0]).toHaveProperty('confidence');
  });
});
