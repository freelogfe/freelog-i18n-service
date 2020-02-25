# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := libssh2
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=libssh2' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-DV8_DEPRECATION_WARNINGS' \
	'-DV8_IMMINENT_DEPRECATION_WARNINGS' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DNETSNMP_ENABLE_IPV6' \
	'-DDEBUG' \
	'-D_DEBUG' \
	'-DV8_ENABLE_CHECKS'

# Flags passed to all source files.
CFLAGS_Debug := \
	-O0 \
	-gdwarf-2 \
	-mmacosx-version-min=10.10 \
	-arch x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter

# Flags passed to only C files.
CFLAGS_C_Debug := \
	-fno-strict-aliasing

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-std=gnu++1y \
	-stdlib=libc++ \
	-fno-rtti \
	-fno-exceptions \
	-fno-strict-aliasing

# Flags passed to only ObjC files.
CFLAGS_OBJC_Debug :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Debug :=

INCS_Debug := \
	-I/Users/wwz/.node-gyp/12.14.0/include/node \
	-I/Users/wwz/.node-gyp/12.14.0/src \
	-I/Users/wwz/.node-gyp/12.14.0/deps/openssl/config \
	-I/Users/wwz/.node-gyp/12.14.0/deps/openssl/openssl/include \
	-I/Users/wwz/.node-gyp/12.14.0/deps/uv/include \
	-I/Users/wwz/.node-gyp/12.14.0/deps/zlib \
	-I/Users/wwz/.node-gyp/12.14.0/deps/v8/include \
	-I$(srcdir)/vendor \
	-I$(srcdir)/vendor/libssh2/include

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=libssh2' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-DV8_DEPRECATION_WARNINGS' \
	'-DV8_IMMINENT_DEPRECATION_WARNINGS' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DNETSNMP_ENABLE_IPV6'

# Flags passed to all source files.
CFLAGS_Release := \
	-Os \
	-gdwarf-2 \
	-mmacosx-version-min=10.10 \
	-arch x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter

# Flags passed to only C files.
CFLAGS_C_Release := \
	-fno-strict-aliasing

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-std=gnu++1y \
	-stdlib=libc++ \
	-fno-rtti \
	-fno-exceptions \
	-fno-strict-aliasing

# Flags passed to only ObjC files.
CFLAGS_OBJC_Release :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Release :=

INCS_Release := \
	-I/Users/wwz/.node-gyp/12.14.0/include/node \
	-I/Users/wwz/.node-gyp/12.14.0/src \
	-I/Users/wwz/.node-gyp/12.14.0/deps/openssl/config \
	-I/Users/wwz/.node-gyp/12.14.0/deps/openssl/openssl/include \
	-I/Users/wwz/.node-gyp/12.14.0/deps/uv/include \
	-I/Users/wwz/.node-gyp/12.14.0/deps/zlib \
	-I/Users/wwz/.node-gyp/12.14.0/deps/v8/include \
	-I$(srcdir)/vendor \
	-I$(srcdir)/vendor/libssh2/include

OBJS := \
	$(obj).target/$(TARGET)/vendor/libssh2/src/agent.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/bcrypt_pbkdf.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/blowfish.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/crypt.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/keepalive.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/libgcrypt.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/openssl.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/publickey.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/sftp.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/version.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/channel.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/global.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/kex.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/mac.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/packet.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/scp.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/transport.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/comp.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/hostkey.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/knownhost.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/misc.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/pem.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/session.o \
	$(obj).target/$(TARGET)/vendor/libssh2/src/userauth.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))
$(OBJS): GYP_OBJCFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE)) $(CFLAGS_OBJC_$(BUILDTYPE))
$(OBJS): GYP_OBJCXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE)) $(CFLAGS_OBJCC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-mmacosx-version-min=10.10 \
	-arch x86_64 \
	-L$(builddir) \
	-stdlib=libc++

LIBTOOLFLAGS_Debug :=

LDFLAGS_Release := \
	-mmacosx-version-min=10.10 \
	-arch x86_64 \
	-L$(builddir) \
	-stdlib=libc++

LIBTOOLFLAGS_Release :=

LIBS :=

$(builddir)/ssh2.a: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(builddir)/ssh2.a: LIBS := $(LIBS)
$(builddir)/ssh2.a: GYP_LIBTOOLFLAGS := $(LIBTOOLFLAGS_$(BUILDTYPE))
$(builddir)/ssh2.a: TOOLSET := $(TOOLSET)
$(builddir)/ssh2.a: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,alink)

all_deps += $(builddir)/ssh2.a
# Add target alias
.PHONY: libssh2
libssh2: $(builddir)/ssh2.a

# Add target alias to "all" target.
.PHONY: all
all: libssh2

# Add target alias
.PHONY: libssh2
libssh2: $(builddir)/ssh2.a

# Short alias for building this static library.
.PHONY: ssh2.a
ssh2.a: $(builddir)/ssh2.a

# Add static library to "all" target.
.PHONY: all
all: $(builddir)/ssh2.a

