import WebsocketProvider from '../../../src/providers/WebsocketProvider';
import Websocket from '../../__mocks__/Websocket';
import W3CWebsocket from '../../__mocks__/W3CWebsocket';
import JsonRpcMapper from '../../../src/mappers/JsonRpcMapper';
import JsonRpcResponseValidator from '../../../src/validators/JsonRpcResponseValidator';
import AbstractWeb3Module from '../../__mocks__/AbstractWeb3Module';
import AbstractMethod from '../../__mocks__/AbstractMethod';

/**
 * WebsocketProvider test
 */
describe('WebsocketProviderTest', () => {
    let websocketProvider,
        socketMock;

    beforeEach(() => {
        socketMock = new Websocket('host', 'protocol');
        socketMock.addEventListener = jest.fn();
        socketMock.removeEventListener = jest.fn();

        websocketProvider = new WebsocketProvider(socketMock, 1);
    });

    it('constructor check', () => {
        expect(websocketProvider.host)
            .toEqual(socketMock.url);

        expect(websocketProvider.connection)
            .toEqual(socketMock);

        expect(websocketProvider.timeout)
            .toEqual(1);

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('message', websocketProvider.onMessage);

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('open', websocketProvider.onReady);

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('close', websocketProvider.onClose);

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('error', websocketProvider.onError);

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('connect', websocketProvider.onConnect);
    });

    it('calls onMessage with an MessageEvent', done => {
       const messageEvent = {data: '{"id":"0x0"}'};

       websocketProvider.on('0x0', response => {
           expect(response)
               .toEqual({id: '0x0'});

           done();
       });

       websocketProvider.onMessage(messageEvent);
    });

    it('calls onError with an Event object', done => {
        const event = {code: '0'};

        websocketProvider.on('error', error => {
            expect(error)
                .toEqual(event);

            done();
        });

        websocketProvider.onError(event);
    });

    it('calls onError with the event code "ECONNREFUSED"', done => {
        const event = {code: 'ECONNREFUSED'};

        setTimeout(() => {
            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('message', websocketProvider.onMessage);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('open', websocketProvider.onReady);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('close', websocketProvider.onClose);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('error', websocketProvider.onError);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('connect', websocketProvider.onConnect);

            expect(socketMock.host)
                .toEqual('host');

            expect(socketMock.protocol)
                .toEqual('protocol');

            expect(socketMock.removeEventListener)
                .toHaveBeenCalled();

            expect(websocketProvider.connection)
                .toBeInstanceOf(Websocket);

            done();

        }, 5010);

        websocketProvider.onError(event);
    }, 5020);

    it('calls onClose with an Event object', done => {
        const event = {code: 1000};
        websocketProvider.on('close', done);
        websocketProvider.onClose(event);
    });

    it('calls onClose with the event code "1001"', done => {
        const event = {code: 1001};

        setTimeout(() => {
            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('message', websocketProvider.onMessage);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('open', websocketProvider.onReady);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('close', websocketProvider.onClose);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('error', websocketProvider.onError);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('connect', websocketProvider.onConnect);

            expect(socketMock.host)
                .toEqual('host');

            expect(socketMock.protocol)
                .toEqual('protocol');

            expect(socketMock.removeEventListener)
                .toHaveBeenCalled();

            expect(websocketProvider.connection)
                .toBeInstanceOf(Websocket);

            done();

        }, 5010);

        websocketProvider.onClose(event);
    }, 5020);

    it('calls reconnect with an WebSocket connection', done => {
        setTimeout(() => {
            expect(socketMock.host)
                .toEqual('host');

            expect(socketMock.protocol)
                .toEqual('protocol');

            expect(websocketProvider.connection)
                .toBeInstanceOf(Websocket);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('message', websocketProvider.onMessage);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('open', websocketProvider.onReady);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('close', websocketProvider.onClose);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('error', websocketProvider.onError);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('connect', websocketProvider.onConnect);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('message', websocketProvider.onMessage);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('open', websocketProvider.onReady);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('close', websocketProvider.onClose);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('error', websocketProvider.onError);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('connect', websocketProvider.onConnect);

            done();
        }, 5010);

        websocketProvider.reconnect();
    }, 5020);

    it('calls reconnect with an W3CWebsocket connection', done => {
        socketMock = new W3CWebsocket('host', 'protocol', null, 'headers', 'requestOptions', 'config');
        socketMock.addEventListener = jest.fn();
        socketMock.removeEventListener = jest.fn();

        websocketProvider = new WebsocketProvider(socketMock, 1);

        setTimeout(() => {
            expect(socketMock.host)
                .toEqual('host');

            expect(socketMock.protocol)
                .toEqual('protocol');

            expect(websocketProvider.connection)
                .toBeInstanceOf(W3CWebsocket);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('message', websocketProvider.onMessage);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('open', websocketProvider.onReady);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('close', websocketProvider.onClose);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('error', websocketProvider.onError);

            expect(socketMock.addEventListener)
                .toHaveBeenCalledWith('connect', websocketProvider.onConnect);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('message', websocketProvider.onMessage);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('open', websocketProvider.onReady);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('close', websocketProvider.onClose);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('error', websocketProvider.onError);

            expect(socketMock.removeEventListener)
                .toHaveBeenCalledWith('connect', websocketProvider.onConnect);

            expect(socketMock.host)
                .toEqual('host');

            expect(socketMock.protocol)
                .toEqual('protocol');

            expect(socketMock.origin)
                .toEqual(null);

            expect(socketMock._client.headers)
                .toEqual('headers');

            expect(socketMock._client.requestOptions)
                .toEqual('requestOptions');

            expect(socketMock._client.config)
                .toEqual('config');

            done();
        }, 5010);

        websocketProvider.reconnect();
    }, 5020);

    it('calls disconnect', () => {
        socketMock.close = jest.fn();

        websocketProvider.disconnect(0, 'nope');

        expect(socketMock.close)
            .toHaveBeenCalledWith(0, 'nope');
    });

    it('calls registerEventListeners', () => {
        websocketProvider.registerEventListeners();

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('message', websocketProvider.onMessage);

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('open', websocketProvider.onReady);

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('close', websocketProvider.onClose);

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('error', websocketProvider.onError);

        expect(socketMock.addEventListener)
            .toHaveBeenCalledWith('connect', websocketProvider.onConnect);
    });

    it('calls removeAllListeners with the event "socket_message"', () => {
        websocketProvider.removeAllListeners('socket_message');

        expect(socketMock.removeEventListener)
            .toHaveBeenCalledWith('message', websocketProvider.onMessage);
    });

    it('calls removeAllListeners with the event "socket_ready"', () => {
        websocketProvider.removeAllListeners('socket_ready');

        expect(socketMock.removeEventListener)
            .toHaveBeenCalledWith('open', websocketProvider.onReady);
    });

    it('calls removeAllListeners with the event "socket_close"', () => {
        websocketProvider.removeAllListeners('socket_close');

        expect(socketMock.removeEventListener)
            .toHaveBeenCalledWith('close', websocketProvider.onClose);
    });

    it('calls removeAllListeners with the event "socket_error"', () => {
        websocketProvider.removeAllListeners('socket_error');

        expect(socketMock.removeEventListener)
            .toHaveBeenCalledWith('error', websocketProvider.onError);
    });

    it('calls removeAllListeners with the event "socket_connect"', () => {
        websocketProvider.removeAllListeners('socket_connect');

        expect(socketMock.removeEventListener)
            .toHaveBeenCalledWith('connect', websocketProvider.onConnect);
    });

    it('gets the property connected and return true', () => {
        socketMock.readyState = 4;
        socketMock.OPEN = 4;

        expect(websocketProvider.connected)
            .toEqual(true);
    });

    it('gets the property connected and return false', () => {
        socketMock.readyState = 0;
        socketMock.OPEN = 4;

        expect(websocketProvider.connected)
            .toEqual(false);
    });

    it('calls isConnecting and returns true', () => {
        socketMock.readyState = 0;
        socketMock.CONNECTING = 0;

        expect(websocketProvider.isConnecting())
            .toEqual(true);
    });

    it('calls isConnecting and returns false', () => {
        socketMock.readyState = 3;
        socketMock.CONNECTING = 0;

        expect(websocketProvider.isConnecting())
            .toEqual(false);
    });

    it('calls send and returns with a resolved promise', async () => {
        JsonRpcMapper.toPayload = jest.fn();
        JsonRpcMapper.toPayload
            .mockReturnValueOnce({id: '0x0'});

        JsonRpcResponseValidator.validate = jest.fn();
        JsonRpcResponseValidator.validate
            .mockReturnValueOnce(true);

        socketMock.OPEN = 4;
        socketMock.readyState = 4;
        socketMock.CONNECTING = 0;
        socketMock.send = jest.fn();
        websocketProvider.timeout = false;

        setTimeout(() => {
            websocketProvider.emit('0x0', true);
        }, 1);

        const response = await websocketProvider.send('rpc_method', []);

        expect(response)
            .toEqual(true);

        expect(socketMock.send)
            .toHaveBeenCalledWith('{"id":"0x0"}');

        expect(JsonRpcMapper.toPayload)
            .toHaveBeenCalledWith('rpc_method', []);

        expect(JsonRpcResponseValidator.validate)
            .toHaveBeenCalledWith(true);

        expect(websocketProvider.listenerCount('0x0'))
            .toEqual(0);
    });

    it('calls send and returns with a rejected promise because of an invalid JSON-RPC response', async () => {
        JsonRpcMapper.toPayload = jest.fn();
        JsonRpcMapper.toPayload
            .mockReturnValueOnce({id: '0x0'});

        JsonRpcResponseValidator.validate = jest.fn();
        JsonRpcResponseValidator.validate
            .mockReturnValueOnce(new Error('ERROR'));

        socketMock.OPEN = 4;
        socketMock.readyState = 4;
        socketMock.CONNECTING = 0;
        socketMock.send = jest.fn();
        websocketProvider.timeout = false;

        setTimeout(() => {
            websocketProvider.emit('0x0', true);
        }, 1);

       await expect(websocketProvider.send('rpc_method', [])).rejects
           .toThrow('ERROR');

        expect(socketMock.send)
            .toHaveBeenCalledWith('{"id":"0x0"}');

        expect(JsonRpcMapper.toPayload)
            .toHaveBeenCalledWith('rpc_method', []);

        expect(JsonRpcResponseValidator.validate)
            .toHaveBeenCalledWith(true);

        expect(websocketProvider.listenerCount('0x0'))
            .toEqual(0);
    });

    it('calls sendBatch and returns with a resolved promise', async () => {
        const abstractMethodMock = new AbstractMethod(),
              moduleInstanceMock = new AbstractWeb3Module();

        abstractMethodMock.beforeExecution = jest.fn();
        abstractMethodMock.rpcMethod = 'rpc_method';
        abstractMethodMock.parameters = [];

        JsonRpcMapper.toPayload = jest.fn();
        JsonRpcMapper.toPayload
            .mockReturnValueOnce({id: '0x0'});

        socketMock.OPEN = 4;
        socketMock.readyState = 4;
        socketMock.CONNECTING = 0;
        socketMock.send = jest.fn();
        websocketProvider.timeout = false;

        setTimeout(() => {
            websocketProvider.emit('0x0', true);
        }, 5);

        const response = await websocketProvider.sendBatch([abstractMethodMock], moduleInstanceMock);

        expect(response)
            .toEqual(true);

        expect(socketMock.send)
            .toHaveBeenCalledWith('[{"id":"0x0"}]');

        expect(JsonRpcMapper.toPayload)
            .toHaveBeenCalledWith('rpc_method', []);

        expect(websocketProvider.listenerCount('0x0'))
            .toEqual(0);

        expect(abstractMethodMock.beforeExecution)
            .toHaveBeenCalled();
    });

    it('calls sendPayload and returns with a rejected promise because the connection is not ready', async () => {
        socketMock.OPEN = 4;
        socketMock.readyState = 2;

        await expect(websocketProvider.sendPayload({id: '0x0'})).rejects
            .toThrow('Connection error: Connection is not open on send()');
    });

    it('calls send and returns with a rejected promise because of the timeout', async () => {
        socketMock.OPEN = 4;
        socketMock.readyState = 4;
        socketMock.CONNECTING = 0;
        socketMock.send = jest.fn();
        websocketProvider.timeout = 1;

        await expect(websocketProvider.sendPayload({id: '0x0'})).rejects
            .toThrow('Connection error: Timeout exceeded');

        expect(socketMock.send)
            .toHaveBeenCalledWith('{"id":"0x0"}');
    });

    it('calls send with a timeout defined and returns with a resolved promise', async () => {
        socketMock.OPEN = 4;
        socketMock.readyState = 4;
        socketMock.CONNECTING = 0;
        socketMock.send = jest.fn();
        websocketProvider.timeout = 2;

        setTimeout(() => {
            websocketProvider.emit('0x0', true);
        }, 1);

        const response = await websocketProvider.sendPayload({id: '0x0'}, []);

        expect(response)
            .toEqual(true);

        expect(socketMock.send)
            .toHaveBeenCalledWith('{"id":"0x0"}');

        expect(websocketProvider.listenerCount('0x0'))
            .toEqual(0);
    });

    it('calls send and returns with a resolved promise but is waiting until the connection is established', async () => {
        socketMock.OPEN = 4;
        socketMock.readyState = 0;
        socketMock.CONNECTING = 0;
        socketMock.send = jest.fn();
        websocketProvider.timeout = false;

        setTimeout(() => {
            socketMock.readyState = 4;
            websocketProvider.emit('open');
        }, 100);

        setTimeout(() => {
            websocketProvider.emit('0x0', true);
        }, 200);

        const response = await websocketProvider.sendPayload({id: '0x0'});

        expect(response)
            .toEqual(true);

        expect(socketMock.send)
            .toHaveBeenCalledWith('{"id":"0x0"}');

        expect(websocketProvider.listenerCount('0x0'))
            .toEqual(0);

        expect(websocketProvider.listenerCount('open'))
            .toEqual(0);
    });
});
