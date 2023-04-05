'use strict';

const app   = require(`${PACKAGE_ROOT}/src/app`);
const event = require(`${PACKAGE_ROOT}/test/event.json`);
const chai  = require('chai');

const expect = chai.expect;

describe('Route handler', function() {
  describe('Route /api/example', function() {
    describe('GET', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = '/api/example';

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
        expect(result.headers).to.have.property('cache-control');
        expect(result.headers['cache-control'][0].value).to.equal('max-age=86400; s-maxage=86400');
        expect(result.headers).to.have.property('content-type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.equal('{"name":"example:index"}');
      });
    });

    describe('POST', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'POST';
        event.Records[0].cf.request.uri    = '/api/example';

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
        expect(result.body).to.equal('{"name":"example:submit"}');
      });
    });
  });

  describe('Route /api/example/private', function() {
    describe('GET', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = '/api/example/private';

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
        expect(result.headers).to.have.property('cache-control');
        expect(result.headers['cache-control'][0].value).to.equal('max-age=86400; s-maxage=86400');
        expect(result.headers).to.have.property('content-type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.equal('{"name":"example/private:index"}');
      });
    });

    describe('POST', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'POST';
        event.Records[0].cf.request.uri    = '/api/example/private';

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

      it('should not return body', function() {
        expect(result.body).to.equal('{"name":"example/private:submit"}');
      });
    });
  });

  describe('Route /api/example/private/image', function() {
    describe('GET', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = '/api/example/private/image';

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
        expect(result.headers).to.have.property('cache-control');
        expect(result.headers['cache-control'][0].value).to.equal('max-age=86400; s-maxage=86400');
        expect(result.headers).to.have.property('content-type');
        expect(result.headers['content-type'][0].value).to.equal('image/png; charset=utf-8');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.match(/iVBORw0KGgoAAAANSUhEUgAAARgAAADwCAMAAADsMIvlAAABOFBMVEX/);
      });
    });
  });
});
