cmd_Release/obj.target/libgit2/vendor/libgit2/src/apply.o := cc '-DNODE_GYP_MODULE_NAME=libgit2' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DGIT_THREADS' '-DGIT_SSH' '-DGIT_SSH_MEMORY_CREDENTIALS' '-DLIBGIT2_NO_FEATURES_H' '-DGIT_SHA1_COLLISIONDETECT' '-DGIT_HTTPS' '-DSRC_UTIL_H_' '-DGIT_ARCH_64' '-DGIT_SECURE_TRANSPORT' '-DGIT_USE_STAT_MTIMESPEC' '-DGIT_REGEX_REGCOMP_L' '-DGIT_USE_ICONV' '-DGIT_NTLM' '-DGIT_GSSAPI' '-DHTTP_PARSER_STRICT=0' -I/Users/wwz/.node-gyp/12.14.0/include/node -I/Users/wwz/.node-gyp/12.14.0/src -I/Users/wwz/.node-gyp/12.14.0/deps/openssl/config -I/Users/wwz/.node-gyp/12.14.0/deps/openssl/openssl/include -I/Users/wwz/.node-gyp/12.14.0/deps/uv/include -I/Users/wwz/.node-gyp/12.14.0/deps/zlib -I/Users/wwz/.node-gyp/12.14.0/deps/v8/include -I../vendor/libgit2/include -I../vendor/libgit2/src -I../vendor/libgit2/deps/ntlmclient -I../vendor/libgit2/deps/zlib -I../vendor/http_parser -I../vendor/libssh2/include  -Os -gdwarf-2 -mmacosx-version-min=10.10 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -Wno-missing-field-initializers -Wno-unused-variable -Wno-deprecated-declarations -Wno-uninitialized -fno-strict-aliasing -MMD -MF ./Release/.deps/Release/obj.target/libgit2/vendor/libgit2/src/apply.o.d.raw   -c -o Release/obj.target/libgit2/vendor/libgit2/src/apply.o ../vendor/libgit2/src/apply.c
Release/obj.target/libgit2/vendor/libgit2/src/apply.o: \
  ../vendor/libgit2/src/apply.c ../vendor/libgit2/src/apply.h \
  ../vendor/libgit2/src/common.h ../vendor/libgit2/include/git2/common.h \
  ../vendor/libgit2/src/cc-compat.h \
  ../vendor/libgit2/include/git2/types.h \
  ../vendor/libgit2/include/git2/buffer.h \
  ../vendor/libgit2/include/git2/oid.h \
  ../vendor/libgit2/include/git2/errors.h ../vendor/libgit2/src/errors.h \
  ../vendor/libgit2/src/thread-utils.h \
  ../vendor/libgit2/src/unix/pthread.h ../vendor/libgit2/src/integer.h \
  ../vendor/libgit2/include/git2/deprecated.h \
  ../vendor/libgit2/include/git2/attr.h \
  ../vendor/libgit2/include/git2/config.h \
  ../vendor/libgit2/include/git2/blame.h \
  ../vendor/libgit2/include/git2/checkout.h \
  ../vendor/libgit2/include/git2/diff.h \
  ../vendor/libgit2/include/git2/tree.h \
  ../vendor/libgit2/include/git2/object.h \
  ../vendor/libgit2/include/git2/refs.h \
  ../vendor/libgit2/include/git2/strarray.h \
  ../vendor/libgit2/include/git2/cherrypick.h \
  ../vendor/libgit2/include/git2/merge.h \
  ../vendor/libgit2/include/git2/oidarray.h \
  ../vendor/libgit2/include/git2/index.h \
  ../vendor/libgit2/include/git2/indexer.h \
  ../vendor/libgit2/include/git2/annotated_commit.h \
  ../vendor/libgit2/include/git2/repository.h \
  ../vendor/libgit2/include/git2/clone.h \
  ../vendor/libgit2/include/git2/remote.h \
  ../vendor/libgit2/include/git2/refspec.h \
  ../vendor/libgit2/include/git2/net.h \
  ../vendor/libgit2/include/git2/transport.h \
  ../vendor/libgit2/include/git2/cert.h \
  ../vendor/libgit2/include/git2/cred.h \
  ../vendor/libgit2/include/git2/pack.h \
  ../vendor/libgit2/include/git2/proxy.h \
  ../vendor/libgit2/include/git2/describe.h \
  ../vendor/libgit2/include/git2/rebase.h \
  ../vendor/libgit2/include/git2/commit.h \
  ../vendor/libgit2/include/git2/trace.h \
  ../vendor/libgit2/include/git2/revert.h \
  ../vendor/libgit2/include/git2/stash.h \
  ../vendor/libgit2/include/git2/status.h \
  ../vendor/libgit2/include/git2/submodule.h \
  ../vendor/libgit2/include/git2/worktree.h \
  ../vendor/libgit2/src/posix.h ../vendor/libgit2/src/unix/posix.h \
  ../vendor/libgit2/src/strnlen.h ../vendor/libgit2/src/util.h \
  ../vendor/libgit2/src/buffer.h ../vendor/libgit2/src/alloc.h \
  ../vendor/libgit2/include/git2/sys/alloc.h \
  ../vendor/libgit2/include/git2/patch.h \
  ../vendor/libgit2/include/git2/apply.h \
  ../vendor/libgit2/include/git2/filter.h \
  ../vendor/libgit2/include/git2/blob.h ../vendor/libgit2/src/array.h \
  ../vendor/libgit2/src/patch.h ../vendor/libgit2/src/futils.h \
  ../vendor/libgit2/src/map.h ../vendor/libgit2/src/path.h \
  ../vendor/libgit2/src/vector.h \
  ../vendor/libgit2/include/git2/sys/path.h ../vendor/libgit2/src/pool.h \
  ../vendor/libgit2/src/strmap.h ../vendor/libgit2/src/oid.h \
  ../vendor/libgit2/src/delta.h ../vendor/libgit2/src/pack.h \
  ../vendor/libgit2/src/mwindow.h ../vendor/libgit2/src/odb.h \
  ../vendor/libgit2/include/git2/odb.h ../vendor/libgit2/src/cache.h \
  ../vendor/libgit2/src/oidmap.h ../vendor/libgit2/src/filter.h \
  ../vendor/libgit2/src/attr_file.h ../vendor/libgit2/src/offmap.h \
  ../vendor/libgit2/src/zstream.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/zlib.h \
  /Users/wwz/.node-gyp/12.14.0/include/node/zconf.h \
  ../vendor/libgit2/src/reader.h ../vendor/libgit2/src/index.h \
  ../vendor/libgit2/src/filebuf.h ../vendor/libgit2/src/hash.h \
  ../vendor/libgit2/src/hash/sha1.h \
  ../vendor/libgit2/src/hash/sha1/collisiondetect.h \
  ../vendor/libgit2/src/hash/sha1/sha1dc/sha1.h \
  ../vendor/libgit2/src/idxmap.h ../vendor/libgit2/src/tree-cache.h
../vendor/libgit2/src/apply.c:
../vendor/libgit2/src/apply.h:
../vendor/libgit2/src/common.h:
../vendor/libgit2/include/git2/common.h:
../vendor/libgit2/src/cc-compat.h:
../vendor/libgit2/include/git2/types.h:
../vendor/libgit2/include/git2/buffer.h:
../vendor/libgit2/include/git2/oid.h:
../vendor/libgit2/include/git2/errors.h:
../vendor/libgit2/src/errors.h:
../vendor/libgit2/src/thread-utils.h:
../vendor/libgit2/src/unix/pthread.h:
../vendor/libgit2/src/integer.h:
../vendor/libgit2/include/git2/deprecated.h:
../vendor/libgit2/include/git2/attr.h:
../vendor/libgit2/include/git2/config.h:
../vendor/libgit2/include/git2/blame.h:
../vendor/libgit2/include/git2/checkout.h:
../vendor/libgit2/include/git2/diff.h:
../vendor/libgit2/include/git2/tree.h:
../vendor/libgit2/include/git2/object.h:
../vendor/libgit2/include/git2/refs.h:
../vendor/libgit2/include/git2/strarray.h:
../vendor/libgit2/include/git2/cherrypick.h:
../vendor/libgit2/include/git2/merge.h:
../vendor/libgit2/include/git2/oidarray.h:
../vendor/libgit2/include/git2/index.h:
../vendor/libgit2/include/git2/indexer.h:
../vendor/libgit2/include/git2/annotated_commit.h:
../vendor/libgit2/include/git2/repository.h:
../vendor/libgit2/include/git2/clone.h:
../vendor/libgit2/include/git2/remote.h:
../vendor/libgit2/include/git2/refspec.h:
../vendor/libgit2/include/git2/net.h:
../vendor/libgit2/include/git2/transport.h:
../vendor/libgit2/include/git2/cert.h:
../vendor/libgit2/include/git2/cred.h:
../vendor/libgit2/include/git2/pack.h:
../vendor/libgit2/include/git2/proxy.h:
../vendor/libgit2/include/git2/describe.h:
../vendor/libgit2/include/git2/rebase.h:
../vendor/libgit2/include/git2/commit.h:
../vendor/libgit2/include/git2/trace.h:
../vendor/libgit2/include/git2/revert.h:
../vendor/libgit2/include/git2/stash.h:
../vendor/libgit2/include/git2/status.h:
../vendor/libgit2/include/git2/submodule.h:
../vendor/libgit2/include/git2/worktree.h:
../vendor/libgit2/src/posix.h:
../vendor/libgit2/src/unix/posix.h:
../vendor/libgit2/src/strnlen.h:
../vendor/libgit2/src/util.h:
../vendor/libgit2/src/buffer.h:
../vendor/libgit2/src/alloc.h:
../vendor/libgit2/include/git2/sys/alloc.h:
../vendor/libgit2/include/git2/patch.h:
../vendor/libgit2/include/git2/apply.h:
../vendor/libgit2/include/git2/filter.h:
../vendor/libgit2/include/git2/blob.h:
../vendor/libgit2/src/array.h:
../vendor/libgit2/src/patch.h:
../vendor/libgit2/src/futils.h:
../vendor/libgit2/src/map.h:
../vendor/libgit2/src/path.h:
../vendor/libgit2/src/vector.h:
../vendor/libgit2/include/git2/sys/path.h:
../vendor/libgit2/src/pool.h:
../vendor/libgit2/src/strmap.h:
../vendor/libgit2/src/oid.h:
../vendor/libgit2/src/delta.h:
../vendor/libgit2/src/pack.h:
../vendor/libgit2/src/mwindow.h:
../vendor/libgit2/src/odb.h:
../vendor/libgit2/include/git2/odb.h:
../vendor/libgit2/src/cache.h:
../vendor/libgit2/src/oidmap.h:
../vendor/libgit2/src/filter.h:
../vendor/libgit2/src/attr_file.h:
../vendor/libgit2/src/offmap.h:
../vendor/libgit2/src/zstream.h:
/Users/wwz/.node-gyp/12.14.0/include/node/zlib.h:
/Users/wwz/.node-gyp/12.14.0/include/node/zconf.h:
../vendor/libgit2/src/reader.h:
../vendor/libgit2/src/index.h:
../vendor/libgit2/src/filebuf.h:
../vendor/libgit2/src/hash.h:
../vendor/libgit2/src/hash/sha1.h:
../vendor/libgit2/src/hash/sha1/collisiondetect.h:
../vendor/libgit2/src/hash/sha1/sha1dc/sha1.h:
../vendor/libgit2/src/idxmap.h:
../vendor/libgit2/src/tree-cache.h:
