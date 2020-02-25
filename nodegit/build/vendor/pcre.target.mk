# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := pcre
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=pcre' \
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
	-I/Users/wwz/.node-gyp/12.14.0/deps/v8/include

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=pcre' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-DV8_DEPRECATION_WARNINGS' \
	'-DV8_IMMINENT_DEPRECATION_WARNINGS' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS'

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
	-I/Users/wwz/.node-gyp/12.14.0/deps/v8/include

OBJS := \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_byte_order.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_chartables.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_compile.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_config.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_dfa_exec.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_exec.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_fullinfo.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_get.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_globals.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_jit_compile.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_maketables.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_newline.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_ord2utf8.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcreposix.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_printint.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_refcount.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_string_utils.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_study.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_tables.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_ucd.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_valid_utf8.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_version.o \
	$(obj).target/$(TARGET)/vendor/libgit2/deps/pcre/pcre_xclass.o

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

$(builddir)/pcre.a: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(builddir)/pcre.a: LIBS := $(LIBS)
$(builddir)/pcre.a: GYP_LIBTOOLFLAGS := $(LIBTOOLFLAGS_$(BUILDTYPE))
$(builddir)/pcre.a: TOOLSET := $(TOOLSET)
$(builddir)/pcre.a: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,alink)

all_deps += $(builddir)/pcre.a
# Add target alias
.PHONY: pcre
pcre: $(builddir)/pcre.a

# Add target alias
.PHONY: pcre
pcre: $(builddir)/pcre.a

# Short alias for building this static library.
.PHONY: pcre.a
pcre.a: $(builddir)/pcre.a
