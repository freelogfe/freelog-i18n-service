cmd_Release/obj.target/nodegit/src/config.o := clang++ '-DNODE_GYP_MODULE_NAME=nodegit' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DBUILDING_NODE_EXTENSION' -I/Users/runner/Library/Caches/node-gyp/12.14.1/include/node -I/Users/runner/Library/Caches/node-gyp/12.14.1/src -I/Users/runner/Library/Caches/node-gyp/12.14.1/deps/openssl/config -I/Users/runner/Library/Caches/node-gyp/12.14.1/deps/openssl/openssl/include -I/Users/runner/Library/Caches/node-gyp/12.14.1/deps/uv/include -I/Users/runner/Library/Caches/node-gyp/12.14.1/deps/zlib -I/Users/runner/Library/Caches/node-gyp/12.14.1/deps/v8/include -I../vendor/libv8-convert -I../vendor/libssh2/include -I../node_modules/nan -I../vendor/libgit2/include  -Os -gdwarf-2 -mmacosx-version-min=10.9 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -Wno-unused-variable -Wint-conversions -Wmissing-field-initializers -Wno-c++11-extensions -std=c++11 -stdlib=libc++ -fno-rtti -fno-strict-aliasing -MMD -MF ./Release/.deps/Release/obj.target/nodegit/src/config.o.d.raw   -c -o Release/obj.target/nodegit/src/config.o ../src/config.cc
Release/obj.target/nodegit/src/config.o: ../src/config.cc \
  ../node_modules/nan/nan.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/node_version.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/errno.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/version.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/unix.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/threadpool.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/darwin.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/node.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8-internal.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8-version.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8config.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8-platform.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/node_buffer.h \
  /Users/runner/Library/Caches/node-gyp/12.14.1/include/node/node_object_wrap.h \
  ../node_modules/nan/nan_callbacks.h \
  ../node_modules/nan/nan_callbacks_12_inl.h \
  ../node_modules/nan/nan_maybe_43_inl.h \
  ../node_modules/nan/nan_converters.h \
  ../node_modules/nan/nan_converters_43_inl.h \
  ../node_modules/nan/nan_new.h \
  ../node_modules/nan/nan_implementation_12_inl.h \
  ../node_modules/nan/nan_persistent_12_inl.h \
  ../node_modules/nan/nan_weak.h ../node_modules/nan/nan_object_wrap.h \
  ../node_modules/nan/nan_private.h \
  ../node_modules/nan/nan_typedarray_contents.h \
  ../node_modules/nan/nan_json.h ../vendor/libgit2/include/git2.h \
  ../vendor/libgit2/include/git2/annotated_commit.h \
  ../vendor/libgit2/include/git2/common.h \
  ../vendor/libgit2/include/git2/repository.h \
  ../vendor/libgit2/include/git2/types.h \
  ../vendor/libgit2/include/git2/buffer.h \
  ../vendor/libgit2/include/git2/oid.h \
  ../vendor/libgit2/include/git2/apply.h \
  ../vendor/libgit2/include/git2/diff.h \
  ../vendor/libgit2/include/git2/tree.h \
  ../vendor/libgit2/include/git2/object.h \
  ../vendor/libgit2/include/git2/refs.h \
  ../vendor/libgit2/include/git2/strarray.h \
  ../vendor/libgit2/include/git2/attr.h \
  ../vendor/libgit2/include/git2/blob.h \
  ../vendor/libgit2/include/git2/blame.h \
  ../vendor/libgit2/include/git2/branch.h \
  ../vendor/libgit2/include/git2/cert.h \
  ../vendor/libgit2/include/git2/checkout.h \
  ../vendor/libgit2/include/git2/cherrypick.h \
  ../vendor/libgit2/include/git2/merge.h \
  ../vendor/libgit2/include/git2/oidarray.h \
  ../vendor/libgit2/include/git2/index.h \
  ../vendor/libgit2/include/git2/indexer.h \
  ../vendor/libgit2/include/git2/clone.h \
  ../vendor/libgit2/include/git2/remote.h \
  ../vendor/libgit2/include/git2/refspec.h \
  ../vendor/libgit2/include/git2/net.h \
  ../vendor/libgit2/include/git2/transport.h \
  ../vendor/libgit2/include/git2/cred.h \
  ../vendor/libgit2/include/git2/pack.h \
  ../vendor/libgit2/include/git2/proxy.h \
  ../vendor/libgit2/include/git2/commit.h \
  ../vendor/libgit2/include/git2/config.h \
  ../vendor/libgit2/include/git2/deprecated.h \
  ../vendor/libgit2/include/git2/describe.h \
  ../vendor/libgit2/include/git2/errors.h \
  ../vendor/libgit2/include/git2/rebase.h \
  ../vendor/libgit2/include/git2/trace.h \
  ../vendor/libgit2/include/git2/revert.h \
  ../vendor/libgit2/include/git2/stash.h \
  ../vendor/libgit2/include/git2/status.h \
  ../vendor/libgit2/include/git2/submodule.h \
  ../vendor/libgit2/include/git2/worktree.h \
  ../vendor/libgit2/include/git2/filter.h \
  ../vendor/libgit2/include/git2/global.h \
  ../vendor/libgit2/include/git2/graph.h \
  ../vendor/libgit2/include/git2/ignore.h \
  ../vendor/libgit2/include/git2/mailmap.h \
  ../vendor/libgit2/include/git2/message.h \
  ../vendor/libgit2/include/git2/notes.h \
  ../vendor/libgit2/include/git2/odb.h \
  ../vendor/libgit2/include/git2/odb_backend.h \
  ../vendor/libgit2/include/git2/patch.h \
  ../vendor/libgit2/include/git2/pathspec.h \
  ../vendor/libgit2/include/git2/refdb.h \
  ../vendor/libgit2/include/git2/reflog.h \
  ../vendor/libgit2/include/git2/reset.h \
  ../vendor/libgit2/include/git2/revparse.h \
  ../vendor/libgit2/include/git2/revwalk.h \
  ../vendor/libgit2/include/git2/signature.h \
  ../vendor/libgit2/include/git2/tag.h \
  ../vendor/libgit2/include/git2/transaction.h \
  ../vendor/libgit2/include/git2/version.h ../src/../include/nodegit.h \
  ../src/../include/thread_pool.h ../src/../include/lock_master.h \
  ../src/../include/functions/copy.h ../src/../include/config.h \
  ../src/../include/async_baton.h ../src/../include/nodegit_wrapper.h \
  ../src/../include/promise_completion.h \
  ../src/../include/reference_counter.h \
  ../src/../include/../include/typedefs.h \
  ../src/../include/../include/git_buf_converter.h \
  ../src/../include/../include/buf.h \
  ../src/../include/../include/config_entry.h \
  ../src/../include/../include/transaction.h \
  ../src/../include/../include/repository.h \
  ../vendor/libgit2/include/git2/sys/repository.h \
  ../src/../include/../include/submodule.h \
  ../src/../include/../include/submodule_update_options.h \
  ../src/../include/callback_wrapper.h \
  ../src/../include/../include/checkout_options.h \
  ../src/../include/../include/diff_file.h \
  ../src/../include/../include/oid.h \
  ../src/../include/../include/strarray.h \
  ../src/../include/../include/str_array_converter.h \
  ../src/../include/../include/tree.h \
  ../src/../include/../include/tree_update.h \
  ../src/../include/../include/tree_entry.h \
  ../src/../include/../include/object.h \
  ../src/../include/../include/index.h \
  ../src/../include/../include/index_entry.h \
  ../src/../include/../include/index_time.h \
  ../src/../include/../include/checkout_perfdata.h \
  ../src/../include/../include/fetch_options.h \
  ../src/../include/../include/remote_callbacks.h \
  ../src/../include/../include/cred.h \
  ../src/../include/../include/cert.h \
  ../src/../include/../include/indexer_progress.h \
  ../src/../include/../include/proxy_options.h \
  ../src/../include/../include/remote.h \
  ../src/../include/../include/remote_head.h \
  ../src/../include/../include/functions/free.h \
  ../src/../include/../include/remote_create_options.h \
  ../src/../include/../include/refspec.h \
  ../src/../include/../include/push_options.h \
  ../src/../include/../include/config.h \
  ../src/../include/../include/reference.h \
  ../src/../include/../include/repository_init_options.h \
  ../src/../include/../include/odb.h \
  ../src/../include/../include/odb_object.h \
  ../src/../include/../include/wrapper.h \
  ../src/../include/../include/worktree.h \
  ../src/../include/../include/worktree_add_options.h \
  ../src/../include/../include/worktree_prune_options.h \
  ../src/../include/../include/refdb.h \
  ../src/../include/../include/annotated_commit.h \
  ../src/../include/../include/reflog.h \
  ../src/../include/../include/signature.h \
  ../src/../include/../include/time.h \
  ../src/../include/../include/reflog_entry.h ../src/nodegit_wrapper.cc \
  ../src/../include/async_libgit2_queue_worker.h \
  ../src/../include/../include/thread_pool.h \
  ../src/../include/../include/nodegit.h \
  ../src/../include/git_buf_converter.h ../src/../include/buf.h \
  ../src/../include/config_entry.h ../src/../include/transaction.h
../src/config.cc:
../node_modules/nan/nan.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/node_version.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/errno.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/version.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/unix.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/threadpool.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/uv/darwin.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/node.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8-internal.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8-version.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8config.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/v8-platform.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/node_buffer.h:
/Users/runner/Library/Caches/node-gyp/12.14.1/include/node/node_object_wrap.h:
../node_modules/nan/nan_callbacks.h:
../node_modules/nan/nan_callbacks_12_inl.h:
../node_modules/nan/nan_maybe_43_inl.h:
../node_modules/nan/nan_converters.h:
../node_modules/nan/nan_converters_43_inl.h:
../node_modules/nan/nan_new.h:
../node_modules/nan/nan_implementation_12_inl.h:
../node_modules/nan/nan_persistent_12_inl.h:
../node_modules/nan/nan_weak.h:
../node_modules/nan/nan_object_wrap.h:
../node_modules/nan/nan_private.h:
../node_modules/nan/nan_typedarray_contents.h:
../node_modules/nan/nan_json.h:
../vendor/libgit2/include/git2.h:
../vendor/libgit2/include/git2/annotated_commit.h:
../vendor/libgit2/include/git2/common.h:
../vendor/libgit2/include/git2/repository.h:
../vendor/libgit2/include/git2/types.h:
../vendor/libgit2/include/git2/buffer.h:
../vendor/libgit2/include/git2/oid.h:
../vendor/libgit2/include/git2/apply.h:
../vendor/libgit2/include/git2/diff.h:
../vendor/libgit2/include/git2/tree.h:
../vendor/libgit2/include/git2/object.h:
../vendor/libgit2/include/git2/refs.h:
../vendor/libgit2/include/git2/strarray.h:
../vendor/libgit2/include/git2/attr.h:
../vendor/libgit2/include/git2/blob.h:
../vendor/libgit2/include/git2/blame.h:
../vendor/libgit2/include/git2/branch.h:
../vendor/libgit2/include/git2/cert.h:
../vendor/libgit2/include/git2/checkout.h:
../vendor/libgit2/include/git2/cherrypick.h:
../vendor/libgit2/include/git2/merge.h:
../vendor/libgit2/include/git2/oidarray.h:
../vendor/libgit2/include/git2/index.h:
../vendor/libgit2/include/git2/indexer.h:
../vendor/libgit2/include/git2/clone.h:
../vendor/libgit2/include/git2/remote.h:
../vendor/libgit2/include/git2/refspec.h:
../vendor/libgit2/include/git2/net.h:
../vendor/libgit2/include/git2/transport.h:
../vendor/libgit2/include/git2/cred.h:
../vendor/libgit2/include/git2/pack.h:
../vendor/libgit2/include/git2/proxy.h:
../vendor/libgit2/include/git2/commit.h:
../vendor/libgit2/include/git2/config.h:
../vendor/libgit2/include/git2/deprecated.h:
../vendor/libgit2/include/git2/describe.h:
../vendor/libgit2/include/git2/errors.h:
../vendor/libgit2/include/git2/rebase.h:
../vendor/libgit2/include/git2/trace.h:
../vendor/libgit2/include/git2/revert.h:
../vendor/libgit2/include/git2/stash.h:
../vendor/libgit2/include/git2/status.h:
../vendor/libgit2/include/git2/submodule.h:
../vendor/libgit2/include/git2/worktree.h:
../vendor/libgit2/include/git2/filter.h:
../vendor/libgit2/include/git2/global.h:
../vendor/libgit2/include/git2/graph.h:
../vendor/libgit2/include/git2/ignore.h:
../vendor/libgit2/include/git2/mailmap.h:
../vendor/libgit2/include/git2/message.h:
../vendor/libgit2/include/git2/notes.h:
../vendor/libgit2/include/git2/odb.h:
../vendor/libgit2/include/git2/odb_backend.h:
../vendor/libgit2/include/git2/patch.h:
../vendor/libgit2/include/git2/pathspec.h:
../vendor/libgit2/include/git2/refdb.h:
../vendor/libgit2/include/git2/reflog.h:
../vendor/libgit2/include/git2/reset.h:
../vendor/libgit2/include/git2/revparse.h:
../vendor/libgit2/include/git2/revwalk.h:
../vendor/libgit2/include/git2/signature.h:
../vendor/libgit2/include/git2/tag.h:
../vendor/libgit2/include/git2/transaction.h:
../vendor/libgit2/include/git2/version.h:
../src/../include/nodegit.h:
../src/../include/thread_pool.h:
../src/../include/lock_master.h:
../src/../include/functions/copy.h:
../src/../include/config.h:
../src/../include/async_baton.h:
../src/../include/nodegit_wrapper.h:
../src/../include/promise_completion.h:
../src/../include/reference_counter.h:
../src/../include/../include/typedefs.h:
../src/../include/../include/git_buf_converter.h:
../src/../include/../include/buf.h:
../src/../include/../include/config_entry.h:
../src/../include/../include/transaction.h:
../src/../include/../include/repository.h:
../vendor/libgit2/include/git2/sys/repository.h:
../src/../include/../include/submodule.h:
../src/../include/../include/submodule_update_options.h:
../src/../include/callback_wrapper.h:
../src/../include/../include/checkout_options.h:
../src/../include/../include/diff_file.h:
../src/../include/../include/oid.h:
../src/../include/../include/strarray.h:
../src/../include/../include/str_array_converter.h:
../src/../include/../include/tree.h:
../src/../include/../include/tree_update.h:
../src/../include/../include/tree_entry.h:
../src/../include/../include/object.h:
../src/../include/../include/index.h:
../src/../include/../include/index_entry.h:
../src/../include/../include/index_time.h:
../src/../include/../include/checkout_perfdata.h:
../src/../include/../include/fetch_options.h:
../src/../include/../include/remote_callbacks.h:
../src/../include/../include/cred.h:
../src/../include/../include/cert.h:
../src/../include/../include/indexer_progress.h:
../src/../include/../include/proxy_options.h:
../src/../include/../include/remote.h:
../src/../include/../include/remote_head.h:
../src/../include/../include/functions/free.h:
../src/../include/../include/remote_create_options.h:
../src/../include/../include/refspec.h:
../src/../include/../include/push_options.h:
../src/../include/../include/config.h:
../src/../include/../include/reference.h:
../src/../include/../include/repository_init_options.h:
../src/../include/../include/odb.h:
../src/../include/../include/odb_object.h:
../src/../include/../include/wrapper.h:
../src/../include/../include/worktree.h:
../src/../include/../include/worktree_add_options.h:
../src/../include/../include/worktree_prune_options.h:
../src/../include/../include/refdb.h:
../src/../include/../include/annotated_commit.h:
../src/../include/../include/reflog.h:
../src/../include/../include/signature.h:
../src/../include/../include/time.h:
../src/../include/../include/reflog_entry.h:
../src/nodegit_wrapper.cc:
../src/../include/async_libgit2_queue_worker.h:
../src/../include/../include/thread_pool.h:
../src/../include/../include/nodegit.h:
../src/../include/git_buf_converter.h:
../src/../include/buf.h:
../src/../include/config_entry.h:
../src/../include/transaction.h:
