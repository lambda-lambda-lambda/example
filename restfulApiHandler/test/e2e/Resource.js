'use strict';

const app   = require(`${PACKAGE_ROOT}/src/app`);
const event = require(`${PACKAGE_ROOT}/test/event.json`);
const chai  = require('chai');

const expect = chai.expect;

describe('Resource handler', function() {
  describe('Resource /api/example', function() {
    const resourceId = 'uuid-123456_AbC';

    describe('PUT (resource)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PUT';
        event.Records[0].cf.request.uri    = `/api/example/${resourceId}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers).to.have.property('access-control-allow-credentials');
        expect(result.headers['access-control-allow-credentials'][0].value).to.equal('true');
        expect(result.headers).to.have.property('access-control-allow-headers');
        expect(result.headers['access-control-allow-headers'][0].value).to.equal('Accept,Authorization,Content-Type');
        expect(result.headers).to.have.property('access-control-allow-methods');
        expect(result.headers['access-control-allow-methods'][0].value).to.equal('DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');
        expect(result.headers).to.have.property('content-type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');

        // Should not be returned.
        expect(result.headers).to.not.have.property('cache-control');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(201);
      });

      it('should return body', function() {
        expect(result.body).to.equal('{"name":"example/uuid-123456_AbC:create"}');
      });
    });

    describe('PATCH (resource)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PATCH';
        event.Records[0].cf.request.uri    = `/api/example/${resourceId}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers).to.have.property('access-control-allow-credentials');
        expect(result.headers['access-control-allow-credentials'][0].value).to.equal('true');
        expect(result.headers).to.have.property('access-control-allow-headers');
        expect(result.headers['access-control-allow-headers'][0].value).to.equal('Accept,Authorization,Content-Type');
        expect(result.headers).to.have.property('access-control-allow-methods');
        expect(result.headers['access-control-allow-methods'][0].value).to.equal('DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');
        expect(result.headers).to.have.property('content-type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');

        // Should not be returned.
        expect(result.headers).to.not.have.property('cache-control');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.equal('{"name":"example/uuid-123456_AbC:update"}');
      });
    });

    describe('DELETE (resource)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'DELETE';
        event.Records[0].cf.request.uri    = `/api/example/${resourceId}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers).to.have.property('access-control-allow-credentials');
        expect(result.headers['access-control-allow-credentials'][0].value).to.equal('true');
        expect(result.headers).to.have.property('access-control-allow-headers');
        expect(result.headers['access-control-allow-headers'][0].value).to.equal('Accept,Authorization,Content-Type');
        expect(result.headers).to.have.property('access-control-allow-methods');
        expect(result.headers['access-control-allow-methods'][0].value).to.equal('DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');
        expect(result.headers).to.have.property('content-type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');

        // Should not be returned.
        expect(result.headers).to.not.have.property('cache-control');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.equal('{"name":"example/uuid-123456_AbC:delete"}');
      });
    });
  });

  describe('Resource /api/example/private', function() {
    const resourceId = 'uuid-123456_AbC';

    describe('PUT (resource)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PUT';
        event.Records[0].cf.request.uri    = `/api/example/private/${resourceId}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        // Define Authorization header.
        event.Records[0].cf.request.headers['authorization'] = [{
          key: 'Authorization',
          value: 'Basic cHJpdmF0ZTpwYXNzd29yZA=='
        }];

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers).to.have.property('access-control-allow-credentials');
        expect(result.headers['access-control-allow-credentials'][0].value).to.equal('true');
        expect(result.headers).to.have.property('access-control-allow-headers');
        expect(result.headers['access-control-allow-headers'][0].value).to.equal('Accept,Authorization,Content-Type');
        expect(result.headers).to.have.property('access-control-allow-methods');
        expect(result.headers['access-control-allow-methods'][0].value).to.equal('DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');
        expect(result.headers).to.have.property('content-type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');

        // Should not be returned.
        expect(result.headers).to.not.have.property('cache-control');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(201);
      });

      it('should return body', function() {
        expect(result.body).to.equal('{"name":"example/private/uuid-123456_AbC:create"}');
      });
    });

    describe('PATCH (resource)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PATCH';
        event.Records[0].cf.request.uri    = `/api/example/private/${resourceId}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        // Define Authorization header.
        event.Records[0].cf.request.headers['authorization'] = [{
          key: 'Authorization',
          value: 'Basic cHJpdmF0ZTpwYXNzd29yZA=='
        }];

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers).to.have.property('access-control-allow-credentials');
        expect(result.headers['access-control-allow-credentials'][0].value).to.equal('true');
        expect(result.headers).to.have.property('access-control-allow-headers');
        expect(result.headers['access-control-allow-headers'][0].value).to.equal('Accept,Authorization,Content-Type');
        expect(result.headers).to.have.property('access-control-allow-methods');
        expect(result.headers['access-control-allow-methods'][0].value).to.equal('DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');
        expect(result.headers).to.have.property('content-type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');

        // Should not be returned.
        expect(result.headers).to.not.have.property('cache-control');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.equal('{"name":"example/private/uuid-123456_AbC:update"}');
      });
    });

    describe('DELETE (resource)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'DELETE';
        event.Records[0].cf.request.uri    = `/api/example/private/${resourceId}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        // Define Authorization header.
        event.Records[0].cf.request.headers['authorization'] = [{
          key: 'Authorization',
          value: 'Basic cHJpdmF0ZTpwYXNzd29yZA=='
        }];

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers).to.have.property('access-control-allow-credentials');
        expect(result.headers['access-control-allow-credentials'][0].value).to.equal('true');
        expect(result.headers).to.have.property('access-control-allow-headers');
        expect(result.headers['access-control-allow-headers'][0].value).to.equal('Accept,Authorization,Content-Type');
        expect(result.headers).to.have.property('access-control-allow-methods');
        expect(result.headers['access-control-allow-methods'][0].value).to.equal('DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');
        expect(result.headers).to.have.property('content-type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');

        // Should not be returned.
        expect(result.headers).to.not.have.property('cache-control');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.equal('{"name":"example/private/uuid-123456_AbC:delete"}');
      });
    });
  });
});
