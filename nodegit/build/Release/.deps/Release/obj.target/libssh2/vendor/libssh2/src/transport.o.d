cmd_Release/obj.target/libssh2/vendor/libssh2/src/transport.o := cc '-DNODE_GYP_MODULE_NAME=libssh2' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DNETSNMP_ENABLE_IPV6' -I/Users/wwz/.node-gyp/12.14.0/include/node -I/Users/wwz/.node-gyp/12.14.0/src -I/Users/wwz/.node-gyp/12.14.0/deps/openssl/config -I/Users/wwz/.node-gyp/12.14.0/deps/openssl/openssl/include -I/Users/wwz/.node-gyp/12.14.0/deps/uv/include -I/Users/wwz/.node-gyp/12.14.0/deps/zlib -I/Users/wwz/.node-gyp/12.14.0/deps/v8/include -I../vendor -I../vendor/libssh2/include  -Os -gdwarf-2 -mmacosx-version-min=10.10 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -fno-strict-aliasing -MMD -MF ./Release/.deps/Release/obj.target/libssh2/vendor/libssh2/src/transport.o.d.raw   -c -o Release/obj.target/libssh2/vendor/libssh2/src/transport.o ../vendor/libssh2/src/transport.c
Release/obj.target/libssh2/vendor/libssh2/src/transport.o: \
  ../vendor/libssh2/src/transport.c ../vendor/libssh2/src/libssh2_priv.h \
  ../vendor/libssh2/src/libssh2_config.h \
  ../vendor/libssh2/include/libssh2.h \
  ../vendor/libssh2/include/libssh2_publickey.h \
  ../vendor/libssh2/include/libssh2_sftp.h ../vendor/libssh2/src/misc.h \
  ../vendor/libssh2/src/crypto.h ../vendor/libssh2/src/openssl.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/opensslconf.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/./opensslconf_asm.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/./archs/darwin64-x86_64-cc/asm/include/openssl/opensslconf.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/opensslv.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/sha.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/e_os2.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/rsa.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/asn1.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/bio.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/crypto.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/safestack.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/stack.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/ossl_typ.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/cryptoerr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/symhacks.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/bioerr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/asn1err.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/bn.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/bnerr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/rsaerr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/engine.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/dsa.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/dh.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/dherr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/dsaerr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/ec.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/ecerr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/rand.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/randerr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/ui.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/pem.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/evp.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/evperr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/objects.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/obj_mac.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/objectserr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/x509.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/buffer.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/buffererr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/x509err.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/x509_vfy.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/lhash.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/pkcs7.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/pkcs7err.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/pemerr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/uierr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/err.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/engineerr.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/md5.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/openssl/hmac.h \
  ../vendor/libssh2/src/transport.h ../vendor/libssh2/src/packet.h \
  ../vendor/libssh2/src/mac.h
../vendor/libssh2/src/transport.c:
../vendor/libssh2/src/libssh2_priv.h:
../vendor/libssh2/src/libssh2_config.h:
../vendor/libssh2/include/libssh2.h:
../vendor/libssh2/include/libssh2_publickey.h:
../vendor/libssh2/include/libssh2_sftp.h:
../vendor/libssh2/src/misc.h:
../vendor/libssh2/src/crypto.h:
../vendor/libssh2/src/openssl.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/opensslconf.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/./opensslconf_asm.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/./archs/darwin64-x86_64-cc/asm/include/openssl/opensslconf.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/opensslv.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/sha.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/e_os2.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/rsa.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/asn1.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/bio.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/crypto.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/safestack.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/stack.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/ossl_typ.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/cryptoerr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/symhacks.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/bioerr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/asn1err.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/bn.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/bnerr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/rsaerr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/engine.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/dsa.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/dh.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/dherr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/dsaerr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/ec.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/ecerr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/rand.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/randerr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/ui.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/pem.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/evp.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/evperr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/objects.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/obj_mac.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/objectserr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/x509.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/buffer.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/buffererr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/x509err.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/x509_vfy.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/lhash.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/pkcs7.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/pkcs7err.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/pemerr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/uierr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/err.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/engineerr.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/md5.h:
/Users/wwz/.node-gyp/12.14.0/include/node/openssl/hmac.h:
../vendor/libssh2/src/transport.h:
../vendor/libssh2/src/packet.h:
../vendor/libssh2/src/mac.h:
