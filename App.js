// CodeQuest — single-file Expo Snack version
// Paste this entire file into snack.expo.dev (App.js), SDK 58.

import React, { createContext, useCallback, useContext, useMemo, useState, useEffect, useRef } from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, View, Animated, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SpaceGrotesk_500Medium, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { JetBrainsMono_500Medium, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';

// ===== theme/colors.js =====
// src/theme/colors.js

// Light, minimalist palette. Semantic names are used everywhere else.
const palette = {
  bg: '#FFFFFF',
  surface: '#F7F7FA',
  surfaceAlt: '#EFEFF4',
  border: '#E4E4EC',

  primary: '#5B4BFF',
  primaryDim: '#493BD6',
  primarySoft: '#E8E5FF',

  success: '#2E9E74',
  successDim: '#247D5C',

  error: '#D64A66',
  errorDim: '#B23A53',

  warning: '#C98A1B',
  warningDim: '#A87416',

  textPrimary: '#16161F',
  textSecondary: '#6B6B7B',
  textMuted: '#9A9AAA',
  textInverse: '#FFFFFF',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(22, 22, 31, 0.5)',
};

// ===== theme/typography.js =====
// src/theme/typography.js


const fontFamily = {
  heading: 'SpaceGrotesk_700Bold',
  headingRegular: 'SpaceGrotesk_500Medium',
  mono: 'JetBrainsMono_500Medium',
  monoBold: 'JetBrainsMono_700Bold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
};

const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 30,
  xxxl: 38,
  display: 48,
};

const lineHeight = {
  xs: 16,
  sm: 20,
  base: 22,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 38,
  xxxl: 46,
  display: 56,
};

const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1.2,
  widest: 2,
};

// Pre-composed text styles — use these directly in StyleSheet
const textStyles = {
  display: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    letterSpacing: letterSpacing.tight,
    color: palette.textPrimary,
  },
  h1: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.xxxl,
    lineHeight: lineHeight.xxxl,
    letterSpacing: letterSpacing.tight,
    color: palette.textPrimary,
  },
  h2: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.xxl,
    lineHeight: lineHeight.xxl,
    color: palette.textPrimary,
  },
  h3: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
    color: palette.textPrimary,
  },
  h4: {
    fontFamily: fontFamily.headingRegular,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    color: palette.textPrimary,
  },
  bodyLg: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    color: palette.textPrimary,
  },
  body: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    color: palette.textPrimary,
  },
  bodySm: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: palette.textSecondary,
  },
  caption: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: palette.textMuted,
    letterSpacing: letterSpacing.wide,
  },
  label: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: fontSize.xs,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase',
    color: palette.textSecondary,
  },
  mono: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    color: palette.textPrimary,
  },
  monoBold: {
    fontFamily: fontFamily.monoBold,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    color: palette.textPrimary,
  },
  button: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: fontSize.md,
    letterSpacing: letterSpacing.normal,
    color: palette.textInverse,
  },
};

// ===== theme/spacing.js =====
// src/theme/spacing.js

// 4pt base grid
const spacing = {
  xxs: 2,
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
};

// Named semantic spacing for layouts
const layout = {
  screenPaddingX: spacing.lg,     // 16
  screenPaddingY: spacing.lg,
  sectionGap:     spacing.xl,     // 24
  cardPadding:    spacing.lg,     // 16
  cardGap:        spacing.md,     // 12
  inputPaddingX:  spacing.md,     // 12
  inputPaddingY:  spacing.md,
  buttonPaddingX: spacing.xl,     // 24
  buttonPaddingY: spacing.md,     // 12
};

// ===== theme/radius.js =====
// src/theme/radius.js

const radius = {
  xs:   4,
  sm:   8,
  md:   12,   // default card radius
  lg:   16,
  xl:   20,
  xxl:  28,
  pill: 999,  // fully rounded (chips, avatars)
  circle: 9999,
};

// ===== theme/shadows.js =====
// src/theme/shadows.js


// Minimal shadows. The glow variants are kept as no-ops so existing
// references stay valid without adding visual noise.
const shadows = {
  none: {},

  sm: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  md: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  lg: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  glowViolet: {},
  glowMint: {},
  glowCoral: {},
};

// ===== theme/tokens.js =====
// src/theme/tokens.js







const tokens = {
  palette,

  // COLORS — semantic
  color: {
    bg: palette.bg,
    surface: palette.surface,
    surfaceAlt: palette.surfaceAlt,
    border: palette.border,

    primary: palette.primary,
    primaryDim: palette.primaryDim,
    primarySoft: palette.primarySoft,

    success: palette.success,
    successDim: palette.successDim,

    error: palette.error,
    errorDim: palette.errorDim,

    warning: palette.warning,
    warningDim: palette.warningDim,

    textPrimary: palette.textPrimary,
    textSecondary: palette.textSecondary,
    textMuted: palette.textMuted,
    textInverse: palette.textInverse,

    overlay: palette.overlay,
  },

  // QUIZ-SPECIFIC SEMANTIC COLORS
  quiz: {
    optionDefaultBg: palette.surfaceAlt,
    optionDefaultBorder: palette.border,
    optionSelectedBg: palette.primarySoft,
    optionSelectedBorder: palette.primary,
    optionCorrectBg: 'rgba(46, 158, 116, 0.12)',
    optionCorrectBorder: palette.success,
    optionWrongBg: 'rgba(214, 74, 102, 0.10)',
    optionWrongBorder: palette.error,
  },

  // STATUS BADGES
  badge: {
    xpBg: 'rgba(201, 138, 27, 0.12)',
    xpText: palette.warning,
    streakBg: 'rgba(214, 74, 102, 0.10)',
    streakText: palette.error,
    levelBg: 'rgba(91, 75, 255, 0.10)',
    levelText: palette.primary,
  },

  // Typography shortcut
  text: textStyles,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,

  // Spacing
  spacing,
  layout,

  // Radius
  radius,

  // Shadows
  shadow: shadows,
};

// ===== data/dummyCategories.js =====
// data/dummyCategories.js

const dummyCategories = [
  {
    id: 'networking',
    title: 'Networking',
    description: 'OSI model, TCP/IP, DNS and routing basics',
    icon: '🌐',
    questions: 5,
    difficulty: 'Easy',
    color: 'violet',
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Data structures, algorithms and OOP concepts',
    icon: '💻',
    questions: 5,
    difficulty: 'Medium',
    color: 'mint',
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'SQL, joins, keys and ACID transactions',
    icon: '🗄️',
    questions: 5,
    difficulty: 'Medium',
    color: 'coral',
  },
  {
    id: 'systems',
    title: 'Systems',
    description: 'Hardware, memory, binary and operating systems',
    icon: '⚙️',
    questions: 5,
    difficulty: 'Hard',
    color: 'violet',
  },
];

// ===== data/dummyLeaderboard.js =====
// data/dummyLeaderboard.js
const dummyLeaderboard = [
  { id: '1', name: 'Sarah Connor', xp: 4250, level: 'Lv. 5 Architect', isCurrentUser: false },
  { id: '2', name: 'Neo Anderson', xp: 3980, level: 'Lv. 4 Hacker', isCurrentUser: false },
  { id: '3', name: 'You (Code Ninja)', xp: 1240, level: 'Lv. 3 Debugger', isCurrentUser: true }, // <-- Us!
  { id: '4', name: 'John Doe', xp: 1100, level: 'Lv. 3 Debugger', isCurrentUser: false },
  { id: '5', name: 'Ada Lovelace', xp: 950, level: 'Lv. 2 Coder', isCurrentUser: false },
  { id: '6', name: 'Alan Turing', xp: 820, level: 'Lv. 2 Coder', isCurrentUser: false },
];

// ===== data/dummyQuestions.js =====
const allQuestions = [
  // NETWORKING
  { id: 'n1', category: 'Networking', question: "Which layer of the OSI model is responsible for routing packets?", options: ["Data Link Layer", "Network Layer", "Transport Layer", "Session Layer"], correctIndex: 1 },
  { id: 'n2', category: 'Networking', question: "What does DNS stand for?", options: ["Domain Name System", "Dynamic Network Service", "Digital Node Server", "Data Network Security"], correctIndex: 0 },
  { id: 'n3', category: 'Networking', question: "Which protocol is connection-oriented and guarantees delivery?", options: ["UDP", "IP", "TCP", "ICMP"], correctIndex: 2 },
  { id: 'n4', category: 'Networking', question: "What is the default port for HTTPS?", options: ["21", "80", "443", "8080"], correctIndex: 2 },
  { id: 'n5', category: 'Networking', question: "Which device operates primarily at the Data Link layer (Layer 2)?", options: ["Router", "Switch", "Hub", "Repeater"], correctIndex: 1 },

  // PROGRAMMING
  { id: 'p1', category: 'Programming', question: "What is the time complexity of binary search?", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], correctIndex: 2 },
  { id: 'p2', category: 'Programming', question: "Which data structure uses FIFO (First In, First Out)?", options: ["Stack", "Queue", "Tree", "Graph"], correctIndex: 1 },
  { id: 'p3', category: 'Programming', question: "In Object-Oriented Programming, what is 'Inheritance'?", options: ["Hiding internal data", "Creating multiple forms of a method", "Acquiring properties from a parent class", "Combining data and functions"], correctIndex: 2 },
  { id: 'p4', category: 'Programming', question: "Which of these is NOT a primitive data type in JavaScript?", options: ["String", "Number", "Object", "Boolean"], correctIndex: 2 },
  { id: 'p5', category: 'Programming', question: "What does the 'git commit' command do?", options: ["Uploads code to GitHub", "Saves changes to the local repository", "Creates a new branch", "Merges two branches"], correctIndex: 1 },

  // DATABASES
  { id: 'd1', category: 'Databases', question: "What does SQL stand for?", options: ["Standard Query Language", "Structured Query Language", "Sequential Query Logic", "System Quality Language"], correctIndex: 1 },
  { id: 'd2', category: 'Databases', question: "Which SQL clause is used to filter records?", options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"], correctIndex: 2 },
  { id: 'd3', category: 'Databases', question: "What is a Primary Key?", options: ["A key that uniquely identifies each record", "A password to access the database", "A foreign key from another table", "An encrypted column"], correctIndex: 0 },
  { id: 'd4', category: 'Databases', question: "Which type of JOIN returns all records from the left table, and matched records from the right?", options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "FULL JOIN"], correctIndex: 2 },
  { id: 'd5', category: 'Databases', question: "What does ACID stand for in database transactions?", options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Data", "Automated, Consistent, Isolated, Dynamic", "Array, Character, Integer, Decimal"], correctIndex: 0 },

  // SYSTEMS
  { id: 's1', category: 'Systems', question: "What is the primary function of the CPU?", options: ["Store long-term data", "Execute instructions and process data", "Render graphics", "Connect to the internet"], correctIndex: 1 },
  { id: 's2', category: 'Systems', question: "Which type of memory is volatile and loses data when power is off?", options: ["ROM", "HDD", "RAM", "SSD"], correctIndex: 2 },
  { id: 's3', category: 'Systems', question: "What is the binary representation of the decimal number 5?", options: ["101", "110", "111", "100"], correctIndex: 0 },
  { id: 's4', category: 'Systems', question: "What does OS stand for in computing?", options: ["Open Source", "Operating System", "Optical Scanner", "Output Signal"], correctIndex: 1 },
  { id: 's5', category: 'Systems', question: "Which component is known as the 'brain' of the computer?", options: ["GPU", "RAM", "Motherboard", "CPU"], correctIndex: 3 }
];

// ===== context/AuthContext.js =====
// context/AuthContext.js


const AuthContext = createContext(null);

// Local demo users — no backend required.
const DEMO_USERS = [
  { name: 'Code Ninja', email: 'demo@codequest.app', password: 'demo1234' },
];

function AuthProvider({ children }) {
  const [users, setUsers] = useState(DEMO_USERS);
  const [user, setUser] = useState(null);

  const signIn = useCallback(
    (email, password) => {
      const found = users.find(
        (entry) =>
          entry.email.toLowerCase() === String(email).trim().toLowerCase() &&
          entry.password === password
      );

      if (!found) {
        return { ok: false, error: 'Incorrect email or password.' };
      }

      setUser({ name: found.name, email: found.email });
      return { ok: true };
    },
    [users]
  );

  const signUp = useCallback(
    (name, email, password) => {
      const cleanEmail = String(email).trim().toLowerCase();

      if (users.some((entry) => entry.email.toLowerCase() === cleanEmail)) {
        return { ok: false, error: 'An account with that email already exists.' };
      }

      const newUser = {
        name: String(name).trim(),
        email: cleanEmail,
        password,
      };

      setUsers((prev) => [...prev, newUser]);
      setUser({ name: newUser.name, email: newUser.email });
      return { ok: true };
    },
    [users]
  );

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut }),
    [user, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};

// ===== context/UserContext.js =====
// context/UserContext.js



const UserContext = createContext(null);

// XP needed to reach each level. Level 1 starts at 0 XP.
const LEVELS = [
  { minXp: 0, rank: 'Newbie' },
  { minXp: 500, rank: 'Coder' },
  { minXp: 1000, rank: 'Debugger' },
  { minXp: 2000, rank: 'Hacker' },
  { minXp: 3500, rank: 'Architect' },
  { minXp: 5500, rank: 'Legend' },
];

function getLevelInfo(xp) {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i += 1) {
    if (xp >= LEVELS[i].minXp) index = i;
  }

  const current = LEVELS[index];
  const next = LEVELS[index + 1] || null;
  const span = next ? next.minXp - current.minXp : 0;

  return {
    level: index + 1,
    rank: current.rank,
    nextLevelXp: next ? next.minXp : null,
    levelProgress: next
      ? Math.min(1, Math.max(0, (xp - current.minXp) / span))
      : 1,
  };
}

function UserProvider({ children }) {
  // Global state for the user
  const { user } = useAuth();

  const [userStats, setUserStats] = useState({
    name: 'Code Ninja',
    xp: 1240,
    quizzesTaken: 24,
    bestStreak: 7,
  });

  // Function to add XP and quizzes when a quiz is finished
  const addQuizResult = useCallback((earnedXp) => {
    const safeXp = Number.isFinite(earnedXp) && earnedXp > 0 ? earnedXp : 0;

    setUserStats((prev) => ({
      ...prev,
      xp: prev.xp + safeXp,
      quizzesTaken: prev.quizzesTaken + 1,
    }));
  }, []);

  // Level, rank and progress are always derived from the current XP.
  const levelInfo = useMemo(() => getLevelInfo(userStats.xp), [userStats.xp]);

  const value = useMemo(
    () => ({
      userStats: {
        ...userStats,
        name: user?.name || userStats.name,
        ...levelInfo,
      },
      addQuizResult,
    }),
    [userStats, user, levelInfo, addQuizResult]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom hook to easily use the context in any screen
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside a UserProvider');
  }
  return context;
};

// ===== components/AppButton.js =====
// src/components/AppButton.js




const VARIANTS = {
  primary: {
    bg: tokens.color.primary,
    bgPressed: tokens.color.primaryDim,
    text: tokens.palette?.white || '#F5F5FA',
    border: 'transparent',
    glow: tokens.shadow.glowViolet,
  },
  secondary: {
    bg: tokens.color.surfaceAlt,
    bgPressed: tokens.color.surface,
    text: tokens.color.textPrimary,
    border: tokens.color.border,
    glow: tokens.shadow.sm,
  },
  ghost: {
    bg: 'transparent',
    bgPressed: 'rgba(91, 75, 255, 0.08)',
    text: tokens.color.primary,
    border: 'transparent',
    glow: {},
  },
  danger: {
    bg: tokens.color.error,
    bgPressed: tokens.color.errorDim,
    text: tokens.color.textInverse,
    border: 'transparent',
    glow: tokens.shadow.glowCoral,
  },
  success: {
    bg: tokens.color.success,
    bgPressed: tokens.color.successDim,
    text: tokens.color.textInverse,
    border: 'transparent',
    glow: tokens.shadow.glowMint,
  },
};

const SIZES = {
  sm: {
    paddingV: tokens.spacing.sm,
    paddingH: tokens.spacing.lg,
    fontSize: tokens.fontSize.sm,
    radius: tokens.radius.pill,
  },
  md: {
    paddingV: tokens.spacing.md,
    paddingH: tokens.spacing.xl,
    fontSize: tokens.fontSize.md,
    radius: tokens.radius.pill,
  },
  lg: {
    paddingV: tokens.spacing.lg,
    paddingH: tokens.spacing.xxl,
    fontSize: tokens.fontSize.lg,
    radius: tokens.radius.pill,
  },
};

function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  style,
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles_components_AppButton_js.base,
        {
          backgroundColor: pressed ? v.bgPressed : v.bg,
          borderColor: v.border,
          paddingVertical: s.paddingV,
          paddingHorizontal: s.paddingH,
          borderRadius: s.radius,
          opacity: isDisabled ? 0.5 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        !isDisabled && v.glow,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} />
      ) : (
        <View style={styles_components_AppButton_js.row}>
          {iconLeft}
          <Text
            style={{
              color: v.text,
              fontFamily: tokens.fontFamily.bodySemiBold,
              fontSize: s.fontSize,
            }}
          >
            {label}
          </Text>
          {iconRight}
        </View>
      )}
    </Pressable>
  );
}

const styles_components_AppButton_js = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  },
});

// ===== components/Badge.js =====
// src/components/Badge.js




const BADGE_VARIANTS = {
  xp: { bg: tokens.badge.xpBg, text: tokens.badge.xpText, icon: '⚡' },
  streak: { bg: tokens.badge.streakBg, text: tokens.badge.streakText, icon: '🔥' },
  level: { bg: tokens.badge.levelBg, text: tokens.badge.levelText, icon: '🏆' },
  success: { bg: 'rgba(46, 158, 116, 0.10)', text: tokens.color.success, icon: '✓' },
  error: { bg: 'rgba(214, 74, 102, 0.10)', text: tokens.color.error, icon: '✕' },
  neutral: { bg: tokens.color.surfaceAlt, text: tokens.color.textSecondary, icon: null },
};

function Badge({
  label,
  variant = 'neutral',
  size = 'md',           // 'sm' | 'md'
  showIcon = true,
  style,
}) {
  const v = BADGE_VARIANTS[variant] || BADGE_VARIANTS.neutral;
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles_components_Badge_js.base,
        {
          backgroundColor: v.bg,
          paddingVertical: isSm ? tokens.spacing.xxs : tokens.spacing.xs,
          paddingHorizontal: isSm ? tokens.spacing.sm : tokens.spacing.md,
        },
        style,
      ]}
    >
      {showIcon && v.icon && (
        <Text style={{ fontSize: isSm ? 10 : 12, color: v.text }}>
          {v.icon}
        </Text>
      )}
      <Text
        style={{
          color: v.text,
          fontFamily: tokens.fontFamily.bodySemiBold,
          fontSize: isSm ? tokens.fontSize.xs : tokens.fontSize.sm,
          letterSpacing: tokens.letterSpacing?.wide || 0.5,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles_components_Badge_js = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    borderRadius: tokens.radius.pill,
  },
});

// ===== components/Card.js =====
// src/components/Card.js




const GLOW_BY_ACCENT = {
  none: {},
  violet: tokens.shadow.glowViolet,
  mint: tokens.shadow.glowMint,
  coral: tokens.shadow.glowCoral,
};

const BORDER_BY_ACCENT = {
  none: tokens.color.border,
  violet: tokens.color.primary,
  mint: tokens.color.success,
  coral: tokens.color.error,
};

function Card({
  children,
  onPress,
  accent = 'none', // 'none' | 'violet' | 'mint' | 'coral'
  padded = true,
  style,
}) {
  const baseStyle = [
    styles_components_Card_js.base,
    {
      padding: padded ? tokens.layout.cardPadding : 0,
      borderColor: BORDER_BY_ACCENT[accent] || tokens.color.border,
    },
    accent !== 'none' && GLOW_BY_ACCENT[accent],
    style,
  ];

  // View does not support the function form of `style` (only Pressable does),
  // so non-interactive cards get a plain style array.
  if (!onPress) {
    return <View style={baseStyle}>{children}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        ...baseStyle,
        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles_components_Card_js = StyleSheet.create({
  base: {
    backgroundColor: tokens.color.surface,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    ...tokens.shadow.md,
  },
});

// ===== components/ProgressBar.js =====
// src/components/ProgressBar.js




function ProgressBar({
  value = 0,            // 0 to 1
  height = 8,
  color = tokens.color.primary,
  trackColor = tokens.color.surfaceAlt,
  label,                // optional left label e.g. "Question 3 of 10"
  showPercent = false,
  animated = true,
  style,
}) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const clamped = Math.max(0, Math.min(1, safeValue));
  // useMemo keeps one stable Animated.Value without reading a ref during render.
  const anim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (animated) {
      Animated.timing(anim, {
        toValue: clamped,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      anim.setValue(clamped);
    }
  }, [clamped, animated, anim]);

  const widthInterpolate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={style}>
      {(label || showPercent) && (
        <View style={styles_components_ProgressBar_js.labelRow}>
          {label && (
            <Text
              style={{
                color: tokens.color.textSecondary,
                fontFamily: tokens.fontFamily.bodyMedium,
                fontSize: tokens.fontSize.sm,
              }}
            >
              {label}
            </Text>
          )}
          {showPercent && (
            <Text
              style={{
                color: tokens.color.textPrimary,
                fontFamily: tokens.fontFamily.monoBold,
                fontSize: tokens.fontSize.sm,
              }}
            >
              {Math.round(clamped * 100)}%
            </Text>
          )}
        </View>
      )}

      <View
        style={[
          styles_components_ProgressBar_js.track,
          { height, backgroundColor: trackColor, borderRadius: height / 2 },
        ]}
      >
        <Animated.View
          style={{
            width: widthInterpolate,
            height,
            backgroundColor: color,
            borderRadius: height / 2,
          }}
        />
      </View>
    </View>
  );
}

const styles_components_ProgressBar_js = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.xs,
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
});

// ===== components/QuizOption.js =====
// src/components/QuizOption.js




const STATE_STYLES = {
  default: {
    bg: tokens.quiz.optionDefaultBg,
    border: tokens.quiz.optionDefaultBorder,
    text: tokens.color.textPrimary,
    badgeBg: tokens.color.surface,
    badgeText: tokens.color.textSecondary,
    glow: {},
  },
  selected: {
    bg: tokens.quiz.optionSelectedBg,
    border: tokens.quiz.optionSelectedBorder,
    text: tokens.color.textPrimary,
    badgeBg: tokens.color.primary,
    badgeText: tokens.color.textInverse,
    glow: tokens.shadow.glowViolet,
  },
  correct: {
    bg: tokens.quiz.optionCorrectBg,
    border: tokens.quiz.optionCorrectBorder,
    text: tokens.color.textPrimary,
    badgeBg: tokens.color.success,
    badgeText: tokens.color.textInverse,
    glow: tokens.shadow.glowMint,
  },
  wrong: {
    bg: tokens.quiz.optionWrongBg,
    border: tokens.quiz.optionWrongBorder,
    text: tokens.color.textPrimary,
    badgeBg: tokens.color.error,
    badgeText: tokens.color.textInverse,
    glow: tokens.shadow.glowCoral,
  },
};

function QuizOption({
  label,          // "A", "B", "C", "D"
  text,           // option content
  state = 'default',
  onPress,
  disabled = false,
}) {
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const isInteractive = !disabled && (state === 'default' || state === 'selected');

  return (
    <Pressable
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      accessibilityRole="radio"
      accessibilityState={{
        selected: state === 'selected',
        disabled,
      }}
      accessibilityLabel={`Option ${label}: ${text}`}
      style={({ pressed }) => [
        styles_components_QuizOption_js.base,
        {
          backgroundColor: s.bg,
          borderColor: s.border,
          opacity: pressed && isInteractive ? 0.85 : 1,
        },
        state !== 'default' && s.glow,
      ]}
    >
      <View
        style={[
          styles_components_QuizOption_js.badge,
          { backgroundColor: s.badgeBg, borderColor: s.border },
        ]}
      >
        <Text
          style={{
            color: s.badgeText,
            fontFamily: tokens.fontFamily.monoBold,
            fontSize: tokens.fontSize.sm,
          }}
        >
          {label}
        </Text>
      </View>
      <Text style={[styles_components_QuizOption_js.text, { color: s.text }]}>{text}</Text>
    </Pressable>
  );
}

const styles_components_QuizOption_js = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing.lg,
    borderRadius: tokens.radius.md,
    borderWidth: 1.5,
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: tokens.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    flex: 1,
    fontFamily: tokens.fontFamily.body,
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight?.base || 22,
  },
});

// ===== screens/AuthScreen.js =====
function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isSignUp = mode === 'signup';

  const switchMode = (next) => {
    setMode(next);
    setError('');
  };

  const handleSubmit = () => {
    if (isSignUp && !name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const result = isSignUp
      ? signUp(name, email, password)
      : signIn(email, password);

    if (!result.ok) {
      setError(result.error);
    }
  };

  const fillDemo = () => {
    setMode('login');
    setEmail('demo@codequest.app');
    setPassword('demo1234');
    setName('');
    setError('');
  };

  return (
    <SafeAreaView style={styles_screens_AuthScreen_js.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles_screens_AuthScreen_js.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles_screens_AuthScreen_js.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand */}
          <View style={styles_screens_AuthScreen_js.brand}>
            <Text style={[tokens.text.h2, { textAlign: 'center' }]}>CodeQuest</Text>
            <Text style={[tokens.text.bodySm, { textAlign: 'center', marginTop: 6 }]}>
              Learn. Quiz. Level up.
            </Text>
          </View>

          {/* Mode switch */}
          <View style={styles_screens_AuthScreen_js.switch}>
            <TouchableOpacity
              style={[styles_screens_AuthScreen_js.switchItem, !isSignUp && styles_screens_AuthScreen_js.switchActive]}
              onPress={() => switchMode('login')}
            >
              <Text
                style={[
                  tokens.text.bodyMedium,
                  { color: isSignUp ? tokens.color.textSecondary : tokens.color.primary },
                ]}
              >
                Log in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles_screens_AuthScreen_js.switchItem, isSignUp && styles_screens_AuthScreen_js.switchActive]}
              onPress={() => switchMode('signup')}
            >
              <Text
                style={[
                  tokens.text.bodyMedium,
                  { color: isSignUp ? tokens.color.primary : tokens.color.textSecondary },
                ]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[tokens.text.h3, { marginBottom: 4 }]}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </Text>
          <Text style={[tokens.text.bodySm, { marginBottom: 28 }]}>
            {isSignUp
              ? 'Start your learning journey in a few seconds.'
              : 'Log in to continue your quizzes.'}
          </Text>

          {isSignUp ? (
            <Field label="Name" value={name} onChangeText={setName} placeholder="Your name" />
          ) : null}

          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="At least 6 characters"
            secureTextEntry
          />

          {error ? (
            <Text style={[tokens.text.bodySm, { color: tokens.color.error, marginBottom: 12 }]}>
              {error}
            </Text>
          ) : null}

          <AppButton
            label={isSignUp ? 'Create account' : 'Log in'}
            variant="primary"
            fullWidth
            onPress={handleSubmit}
          />

          <TouchableOpacity onPress={fillDemo} style={styles_screens_AuthScreen_js.demoButton}>
            <Text style={[tokens.text.bodySm, { color: tokens.color.primary }]}>
              Use demo account
            </Text>
          </TouchableOpacity>
          <Text style={[tokens.text.caption, { textAlign: 'center', marginTop: 6 }]}>
            demo@codequest.app / demo1234
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, value, onChangeText, placeholder, ...inputProps }) {
  return (
    <View style={styles_screens_AuthScreen_js.field}>
      <Text style={[tokens.text.bodySm, { marginBottom: 8 }]}>{label}</Text>
      <TextInput
        style={styles_screens_AuthScreen_js.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.color.textMuted}
        {...inputProps}
      />
    </View>
  );
}

const styles_screens_AuthScreen_js = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: tokens.layout.screenPaddingX,
    paddingTop: 40,
    paddingBottom: 40,
  },
  brand: {
    marginBottom: 36,
  },
  switch: {
    flexDirection: 'row',
    backgroundColor: tokens.color.surfaceAlt,
    borderRadius: tokens.radius.md,
    padding: 4,
    marginBottom: 32,
  },
  switchItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: tokens.radius.sm,
  },
  switchActive: {
    backgroundColor: tokens.color.bg,
    ...tokens.shadow.sm,
  },
  field: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: tokens.color.border,
    backgroundColor: tokens.color.bg,
    borderRadius: tokens.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: tokens.fontFamily.body,
    fontSize: tokens.fontSize.base,
    color: tokens.color.textPrimary,
  },
  demoButton: {
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 8,
  },
});

// ===== screens/HomeScreen.js =====
function HomeScreen({ navigation }) {
  const { userStats } = useUser(); // <-- Get global stats

  return (
    <SafeAreaView style={styles_screens_HomeScreen_js.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles_screens_HomeScreen_js.scrollContent}>
        
        {/* HEADER SECTION */}
        <View style={styles_screens_HomeScreen_js.header}>
          <View>
            <Text style={tokens.text.bodySm}>Welcome back,</Text>
            <Text style={tokens.text.h2}>{userStats.name}</Text>
          </View>
          <View style={styles_screens_HomeScreen_js.avatar}>
            <Text style={{ fontSize: 24 }}>👨‍💻</Text>
          </View>
        </View>

        {/* STATS ROW */}
        <View style={styles_screens_HomeScreen_js.statsRow}>
          <Badge label={`${userStats.xp} XP`} variant="xp" />
          <Badge label={`${userStats.bestStreak} Days`} variant="streak" />
          <Badge label={`Lv. ${userStats.level} ${userStats.rank}`} variant="level" />
        </View>

        {/* CONTINUE LEARNING CARD */}
        <Text style={[tokens.text.h4, { marginTop: 24, marginBottom: 12 }]}>
          Continue Learning
        </Text>
        <Card accent="violet" onPress={() => navigation.navigate('Quiz', { category: 'Networking' })}>
          <Text style={tokens.text.h3}>Networking Basics</Text>
          <Text style={[tokens.text.bodySm, { marginTop: 4, marginBottom: 16 }]}>
            5 questions • pick up where you left off
          </Text>
          <ProgressBar 
            value={0.6} 
            showPercent={true} 
            color={tokens.color.primary} 
          />
        </Card>

        {/* CATEGORIES SECTION */}
        <View style={styles_screens_HomeScreen_js.sectionHeader}>
          <Text style={tokens.text.h4}>Start a New Quiz</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Categories')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[tokens.text.bodySm, { color: tokens.color.primary }]}>
              Browse all ›
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles_screens_HomeScreen_js.grid}>
          <Card onPress={() => navigation.navigate('Quiz', { category: 'Networking' })} style={styles_screens_HomeScreen_js.categoryCard}>
            <Text style={{ fontSize: 28, marginBottom: 8 }}>🌐</Text>
            <Text style={tokens.text.body}>Networking</Text>
          </Card>
          
          <Card onPress={() => navigation.navigate('Quiz', { category: 'Programming' })} style={styles_screens_HomeScreen_js.categoryCard}>
            <Text style={{ fontSize: 28, marginBottom: 8 }}>💻</Text>
            <Text style={tokens.text.body}>Programming</Text>
          </Card>

          <Card onPress={() => navigation.navigate('Quiz', { category: 'Databases' })} style={styles_screens_HomeScreen_js.categoryCard}>
            <Text style={{ fontSize: 28, marginBottom: 8 }}>🗄️</Text>
            <Text style={tokens.text.body}>Databases</Text>
          </Card>

          <Card onPress={() => navigation.navigate('Quiz', { category: 'Systems' })} style={styles_screens_HomeScreen_js.categoryCard}>
            <Text style={{ fontSize: 28, marginBottom: 8 }}>⚙️</Text>
            <Text style={tokens.text.body}>Systems</Text>
          </Card>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles_screens_HomeScreen_js = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  scrollContent: {
    padding: tokens.layout.screenPaddingX,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: tokens.color.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tokens.color.border,
  },
  statsRow: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.md,
  },
  categoryCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: tokens.spacing.xl,
  }
});

// ===== screens/CategoriesScreen.js =====
function CategoriesScreen({ navigation }) {
  
  const handleStartQuiz = (categoryTitle) => {
    navigation.navigate('Quiz', { category: categoryTitle });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleStartQuiz(item.title)} activeOpacity={0.8}>
        <Card accent={item.color} style={styles_screens_CategoriesScreen_js.categoryCard}>
          <View style={styles_screens_CategoriesScreen_js.row}>
            
            <View style={styles_screens_CategoriesScreen_js.iconContainer}>
              <Text style={{ fontSize: 28 }}>{item.icon}</Text>
            </View>

            <View style={styles_screens_CategoriesScreen_js.textContainer}>
              <Text style={tokens.text.h4}>{item.title}</Text>
              <Text style={tokens.text.bodySm} numberOfLines={1}>{item.description}</Text>
              
              <View style={styles_screens_CategoriesScreen_js.metaRow}>
                <Text style={[tokens.text.caption, { marginRight: 12 }]}>
                  📝 {item.questions} Questions
                </Text>
                <Badge 
                  label={item.difficulty} 
                  variant={
                    item.difficulty === 'Easy' ? 'success' : 
                    item.difficulty === 'Medium' ? 'xp' : 'error'
                  } 
                  size="sm"
                  showIcon={false}
                />
              </View>
            </View>

            <Text style={{ color: tokens.color.textMuted, fontSize: 20 }}>›</Text>

          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles_screens_CategoriesScreen_js.container} edges={['top', 'bottom']}>
      
      <View style={styles_screens_CategoriesScreen_js.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles_screens_CategoriesScreen_js.backButton}>
          <Text style={{ color: tokens.color.textPrimary, fontSize: 24 }}>←</Text>
        </TouchableOpacity>
        <Text style={tokens.text.h2}>Categories</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <FlatList
        data={dummyCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles_screens_CategoriesScreen_js.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles_screens_CategoriesScreen_js = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.layout.screenPaddingX,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  listContent: {
    paddingHorizontal: tokens.layout.screenPaddingX,
    paddingBottom: 40,
  },
  categoryCard: {
    marginBottom: tokens.spacing.md,
    padding: tokens.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.color.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacing.md,
    borderWidth: 1,
    borderColor: tokens.color.border,
  },
  textContainer: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  }
});

// ===== screens/QuizScreen.js =====
const QUESTIONS_PER_QUIZ = 5;
const QUESTION_TIME = 60;

// Fisher-Yates shuffle, then take the first n items.
const getRandomQuestions = (arr, n) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
};

function QuizScreen({ route, navigation }) {
  const { category = 'Networking' } = route.params || {};
  const celebrateTimeoutRef = useRef(null);
  // Prevents a timeout and a button press from advancing the same question twice.
  const transitionLock = useRef(false);

  // Pick the questions once, when the screen mounts.
  const [questions] = useState(() => {
    const filtered = allQuestions.filter((q) => q.category === category);
    return getRandomQuestions(filtered, QUESTIONS_PER_QUIZ);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const hasQuestions = questions.length > 0;
  const progress = hasQuestions ? (currentIndex + 1) / questions.length : 0;

  const goToResults = useCallback(
    (finalScore, finalAnswers) => {
      navigation.replace('Results', {
        score: finalScore,
        total: questions.length,
        answers: finalAnswers,
        questions,
        category,
      });
    },
    [navigation, questions, category]
  );

  const handleTimeOut = useCallback(() => {
    if (isFinished || !hasQuestions || transitionLock.current) return;

    transitionLock.current = true;
    const newAnswers = [...userAnswers, null];
    setUserAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      setSelectedOption(null);
      setTimeLeft(QUESTION_TIME);
    } else {
      setIsFinished(true);
      goToResults(score, newAnswers);
    }
  }, [isFinished, hasQuestions, userAnswers, currentIndex, questions.length, score, goToResults]);

  // Countdown. A single timeout is scheduled per tick and cleaned up on unmount
  // or when the question changes. The final tick advances the question from
  // inside the callback, so no state is set synchronously in the effect body.
  useEffect(() => {
    if (isFinished || !hasQuestions) return undefined;

    const timerId = setTimeout(() => {
      if (timeLeft <= 1) {
        handleTimeOut();
      } else {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, isFinished, hasQuestions, handleTimeOut]);

  // Cancel the celebration delay if the user leaves mid-animation.
  useEffect(() => () => clearTimeout(celebrateTimeoutRef.current), []);

  // A new question is on screen, so the next transition is allowed again.
  useEffect(() => {
    transitionLock.current = false;
  }, [currentIndex]);

  const handleNext = () => {
    if (transitionLock.current || selectedOption === null || isFinished || !currentQuestion) return;

    transitionLock.current = true;
    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    const newScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) setScore(newScore);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      setSelectedOption(null);
      setTimeLeft(QUESTION_TIME);
      return;
    }

    // Last question: stop the timer before navigating.
    setIsFinished(true);

    if (newScore === questions.length) {
      // Give the user a moment to enjoy the confetti.
      celebrateTimeoutRef.current = setTimeout(() => {
        goToResults(newScore, newAnswers);
      }, 2000);
    } else {
      goToResults(newScore, newAnswers);
    }
  };

  if (!hasQuestions || !currentQuestion) {
    return (
      <SafeAreaView style={styles_screens_QuizScreen_js.container} edges={['top', 'bottom']}>
        <View style={styles_screens_QuizScreen_js.emptyState}>
          <Text style={tokens.text.h3}>No questions available</Text>
          <Text style={[tokens.text.body, { marginTop: 8, marginBottom: 24, textAlign: 'center' }]}>
            We couldn&apos;t find any questions for {category}.
          </Text>
          <AppButton label="Go Back" variant="primary" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const safeTimeLeft = Math.max(0, timeLeft);
  const minutes = String(Math.floor(safeTimeLeft / 60)).padStart(2, '0');
  const seconds = String(safeTimeLeft % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles_screens_QuizScreen_js.container} edges={['top', 'bottom']}>
      

      {/* HEADER */}
      <View style={styles_screens_QuizScreen_js.header}>
        <View>
          <Text style={tokens.text.bodySm}>
            {category} • Q{currentIndex + 1}/{questions.length}
          </Text>
          <Text
            style={[
              tokens.text.monoBold,
              {
                fontSize: 20,
                color: safeTimeLeft <= 10 ? tokens.color.error : tokens.color.primary,
                marginTop: 4,
              },
            ]}
          >
            ⏱ {minutes}:{seconds}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: tokens.color.error, fontFamily: tokens.fontFamily.bodyBold }}>
            Quit
          </Text>
        </TouchableOpacity>
      </View>

      <ProgressBar value={progress} height={6} style={{ marginBottom: 32 }} />

      <Text style={[tokens.text.h3, { marginBottom: 24, color: tokens.color.textPrimary }]}>
        {currentQuestion.question}
      </Text>

      <View style={{ flex: 1 }}>
        {currentQuestion.options.map((optionText, index) => (
          <QuizOption
            key={index}
            label={String.fromCharCode(65 + index)}
            text={optionText}
            state={selectedOption === index ? 'selected' : 'default'}
            onPress={() => setSelectedOption(index)}
          />
        ))}
      </View>

      <AppButton
        label={currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        variant="primary"
        fullWidth
        onPress={handleNext}
        disabled={selectedOption === null || isFinished}
      />
    </SafeAreaView>
  );
}

const styles_screens_QuizScreen_js = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
    padding: tokens.layout.screenPaddingX,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ===== screens/ResultsScreen.js =====
function ResultsScreen({ route, navigation }) {
  const {
    score = 0,
    total = 0,
    answers = [],
    questions = [],
    category,
  } = route.params || {};

  const { addQuizResult } = useUser();
  const hasLoggedResult = useRef(false);

  const percentage = total > 0 ? Math.min(1, Math.max(0, score / total)) : 0;
  const earnedXp = score * 15;

  // Add XP exactly once per result screen, even if the component re-renders.
  useEffect(() => {
    if (hasLoggedResult.current) return;
    hasLoggedResult.current = true;
    if (total > 0) addQuizResult(earnedXp);
  }, [addQuizResult, earnedXp, total]);

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <SafeAreaView style={styles_screens_ResultsScreen_js.container} edges={['top', 'bottom']}>
      <View style={styles_screens_ResultsScreen_js.content}>
        <Badge label="Quiz Complete!" variant="success" size="md" style={{ marginBottom: 24 }} />

        <Text style={[tokens.text.display, { color: tokens.color.success }]}>
          {score} / {total}
        </Text>

        <Text style={[tokens.text.body, { marginTop: 8, marginBottom: 32 }]}>
          Accuracy: {Math.round(percentage * 100)}%
        </Text>

        <Card style={{ width: '100%', alignItems: 'center', marginBottom: 32 }}>
          <Text style={tokens.text.h4}>XP Earned</Text>
          <Text style={[tokens.text.h2, { color: tokens.color.warning, marginVertical: 12 }]}>
            + {earnedXp} XP
          </Text>
          <ProgressBar value={percentage} color={tokens.color.success} height={10} />
        </Card>

        <AppButton label="Back to Home" variant="primary" fullWidth onPress={goHome} />

        <AppButton
          label="Review Answers"
          variant="secondary"
          fullWidth
          style={{ marginTop: 12 }}
          onPress={() => navigation.navigate('Review', { answers, questions, category })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles_screens_ResultsScreen_js = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.layout.screenPaddingX,
  },
});

// ===== screens/ReviewScreen.js =====
function ReviewScreen({ route, navigation }) {
  const { answers = [], questions = [], category } = route.params || {};

  return (
    <SafeAreaView style={styles_screens_ReviewScreen_js.container} edges={['top', 'bottom']}>
      {/* HEADER */}
      <View style={styles_screens_ReviewScreen_js.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles_screens_ReviewScreen_js.backButton}>
          <Text style={{ color: tokens.color.textPrimary, fontSize: 24 }}>←</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={tokens.text.h2}>Review</Text>
          {category ? (
            <Text style={[tokens.text.caption, { marginTop: 2 }]}>{category}</Text>
          ) : null}
        </View>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles_screens_ReviewScreen_js.scrollContent} showsVerticalScrollIndicator={false}>
        {questions.length === 0 ? (
          <Text style={[tokens.text.body, { textAlign: 'center', marginTop: 40 }]}>
            No questions to review.
          </Text>
        ) : (
          questions.map((question, index) => {
            const userAnswer = answers[index];
            const isUnanswered = userAnswer === null || userAnswer === undefined;
            const isCorrect = userAnswer === question.correctIndex;

            return (
              <View key={question.id} style={styles_screens_ReviewScreen_js.questionBlock}>
                {/* Question Header */}
                <View style={styles_screens_ReviewScreen_js.qHeader}>
                  <Text style={tokens.text.bodySm}>Question {index + 1}</Text>
                  <Text
                    style={{
                      color: isCorrect ? tokens.color.success : tokens.color.error,
                      fontWeight: 'bold',
                    }}
                  >
                    {isCorrect ? 'Correct ✓' : isUnanswered ? 'Not Answered ⏱' : 'Incorrect ✕'}
                  </Text>
                </View>

                {/* Question Text */}
                <Text style={[tokens.text.h4, { marginBottom: 16 }]}>{question.question}</Text>

                {/* Options */}
                {question.options.map((optionText, optIndex) => {
                  let state = 'default';

                  // Highlight the correct answer in green
                  if (optIndex === question.correctIndex) {
                    state = 'correct';
                  }
                  // Highlight the user's wrong answer in red
                  else if (optIndex === userAnswer && !isCorrect) {
                    state = 'wrong';
                  }

                  return (
                    <QuizOption
                      key={optIndex}
                      label={String.fromCharCode(65 + optIndex)}
                      text={optionText}
                      state={state}
                      disabled
                    />
                  );
                })}
              </View>
            );
          })
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles_screens_ReviewScreen_js = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.layout.screenPaddingX,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  scrollContent: {
    paddingHorizontal: tokens.layout.screenPaddingX,
    paddingBottom: 40,
  },
  questionBlock: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: tokens.color.border,
    paddingBottom: 24,
  },
  qHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});

// ===== screens/LeaderboardScreen.js =====
function LeaderboardScreen() {
  const { userStats } = useUser(); // <-- Get live stats

  // 1. Update the current user's live data, then sort highest to lowest
  const liveLeaderboard = dummyLeaderboard
    .map((user) => {
      if (user.isCurrentUser) {
        return {
          ...user,
          name: userStats.name,
          xp: userStats.xp,
          level: `Lv. ${userStats.level} ${userStats.rank}`,
        };
      }
      return user;
    })
    .sort((a, b) => b.xp - a.xp); // Sort descending

  // Helper to render the medal for the top 3
  const getMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const renderItem = ({ item, index }) => {
    const isTop3 = index < 3;
    
    return (
      <Card 
        accent={item.isCurrentUser ? 'violet' : 'none'}
        style={[
          styles_screens_LeaderboardScreen_js.listCard, 
          isTop3 && styles_screens_LeaderboardScreen_js.top3Card, 
          item.isCurrentUser && styles_screens_LeaderboardScreen_js.currentUserCard
        ]}
      >
        <View style={styles_screens_LeaderboardScreen_js.row}>
          {/* Rank / Medal */}
          <View style={styles_screens_LeaderboardScreen_js.rankContainer}>
            <Text style={[
              tokens.text.monoBold, 
              { fontSize: isTop3 ? 24 : 16, color: isTop3 ? tokens.color.warning : tokens.color.textMuted }
            ]}>
              {getMedal(index)}
            </Text>
          </View>

          {/* User Info */}
          <View style={styles_screens_LeaderboardScreen_js.userInfo}>
            <Text style={[tokens.text.bodyMedium, item.isCurrentUser && { color: tokens.color.primary }]}>
              {item.name}
            </Text>
            <Text style={tokens.text.caption}>{item.level}</Text>
          </View>

          {/* XP */}
          <View style={styles_screens_LeaderboardScreen_js.xpContainer}>
            <Text style={[tokens.text.monoBold, { color: tokens.color.warning }]}>
              {item.xp} XP
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles_screens_LeaderboardScreen_js.container} edges={['top']}>
      <View style={styles_screens_LeaderboardScreen_js.header}>
        <Text style={tokens.text.h2}>Leaderboard 🏆</Text>
        <Text style={[tokens.text.bodySm, { marginTop: 4 }]}>
          See how you stack up against other IT students.
        </Text>
      </View>

      <FlatList
        data={liveLeaderboard} // <-- Use the live sorted data
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles_screens_LeaderboardScreen_js.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles_screens_LeaderboardScreen_js = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  header: {
    padding: tokens.layout.screenPaddingX,
    paddingTop: 32,
    paddingBottom: 16,
  },
  listContent: {
    paddingHorizontal: tokens.layout.screenPaddingX,
    paddingBottom: 40,
  },
  listCard: {
    marginBottom: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  top3Card: {
    borderColor: 'rgba(201, 138, 27, 0.35)',
  },
  currentUserCard: {
    backgroundColor: tokens.color.primarySoft,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
    paddingLeft: tokens.spacing.sm,
  },
  xpContainer: {
    alignItems: 'flex-end',
  }
});

// ===== screens/ProfileScreen.js =====
function ProfileScreen() {
  const { userStats } = useUser(); // <-- Get global stats
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles_screens_ProfileScreen_js.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles_screens_ProfileScreen_js.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles_screens_ProfileScreen_js.header}>
          <View style={styles_screens_ProfileScreen_js.avatar}>
            <Text style={{ fontSize: 40 }}>👨‍💻</Text>
          </View>
          <Text style={[tokens.text.h2, { marginTop: 12 }]}>{userStats.name}</Text>
          <Badge label={`Lv. ${userStats.level} ${userStats.rank}`} variant="level" style={{ marginTop: 8 }} />
          
          {/* XP Progress to next level */}
          <View style={styles_screens_ProfileScreen_js.xpContainer}>
            <Text style={tokens.text.bodySm}>
              {userStats.nextLevelXp
                ? `${userStats.xp} / ${userStats.nextLevelXp} XP to Level ${userStats.level + 1}`
                : 'Max level reached'}
            </Text>
            <ProgressBar
              value={userStats.levelProgress}
              color={tokens.color.primary}
              height={8}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>

        {/* STATS GRID */}
        <View style={styles_screens_ProfileScreen_js.statsGrid}>
          <Card style={styles_screens_ProfileScreen_js.statCard}>
            <Text style={tokens.text.h3}>{userStats.quizzesTaken}</Text>
            <Text style={tokens.text.bodySm}>Quizzes Taken</Text>
          </Card>
          <Card style={styles_screens_ProfileScreen_js.statCard}>
            <Text style={[tokens.text.h3, { color: tokens.color.warning }]}>{userStats.xp}</Text>
            <Text style={tokens.text.bodySm}>Total XP</Text>
          </Card>
          <Card style={styles_screens_ProfileScreen_js.statCard}>
            <Text style={[tokens.text.h3, { color: tokens.color.error }]}>{userStats.bestStreak}</Text>
            <Text style={tokens.text.bodySm}>Best Streak</Text>
          </Card>
        </View>

        {/* ACHIEVEMENTS */}
        <Text style={[tokens.text.h4, { marginTop: 32, marginBottom: 12 }]}>
          Achievements
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles_screens_ProfileScreen_js.badgeScroll}>
          <View style={styles_screens_ProfileScreen_js.badgeItem}>
            <View style={[styles_screens_ProfileScreen_js.badgeIcon, { borderColor: tokens.color.warning }]}>
              <Text style={{ fontSize: 28 }}>🏆</Text>
            </View>
            <Text style={[tokens.text.caption, { marginTop: 8 }]}>First Quiz</Text>
          </View>

          <View style={styles_screens_ProfileScreen_js.badgeItem}>
            <View style={[styles_screens_ProfileScreen_js.badgeIcon, { borderColor: tokens.color.success }]}>
              <Text style={{ fontSize: 28 }}>🔥</Text>
            </View>
            <Text style={[tokens.text.caption, { marginTop: 8 }]}>7 Day Streak</Text>
          </View>

          <View style={styles_screens_ProfileScreen_js.badgeItem}>
            <View style={[styles_screens_ProfileScreen_js.badgeIcon, { borderColor: tokens.color.error }]}>
              <Text style={{ fontSize: 28 }}>⚡</Text>
            </View>
            <Text style={[tokens.text.caption, { marginTop: 8 }]}>Perfect Score</Text>
          </View>

          <View style={[styles_screens_ProfileScreen_js.badgeItem, { opacity: 0.4 }]}>
            <View style={[styles_screens_ProfileScreen_js.badgeIcon, { borderColor: tokens.color.border }]}>
              <Text style={{ fontSize: 28 }}>🔒</Text>
            </View>
            <Text style={[tokens.text.caption, { marginTop: 8 }]}>Locked</Text>
          </View>
        </ScrollView>

        {/* RECENT HISTORY */}
        <Text style={[tokens.text.h4, { marginTop: 32, marginBottom: 12 }]}>
          Recent History
        </Text>
        
        <Card style={styles_screens_ProfileScreen_js.historyCard}>
          <View style={styles_screens_ProfileScreen_js.historyRow}>
            <View>
              <Text style={tokens.text.bodyMedium}>Networking Basics</Text>
              <Text style={tokens.text.caption}>2 days ago</Text>
            </View>
            <Badge label="8/10" variant="success" />
          </View>
        </Card>

        <Card style={styles_screens_ProfileScreen_js.historyCard}>
          <View style={styles_screens_ProfileScreen_js.historyRow}>
            <View>
              <Text style={tokens.text.bodyMedium}>Database Systems</Text>
              <Text style={tokens.text.caption}>5 days ago</Text>
            </View>
            <Badge label="6/10" variant="neutral" />
          </View>
        </Card>

        {/* LOGOUT BUTTON */}
        <AppButton 
          label="Log Out" 
          variant="danger" 
          fullWidth 
          style={{ marginTop: 24, marginBottom: 40 }} 
          onPress={signOut}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles_screens_ProfileScreen_js = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  scrollContent: {
    padding: tokens.layout.screenPaddingX,
    paddingTop: 32,
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: tokens.color.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: tokens.color.primary,
    ...tokens.shadow.glowViolet,
  },
  xpContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    gap: tokens.spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.xs,
  },
  badgeScroll: {
    marginHorizontal: -tokens.layout.screenPaddingX,
    paddingHorizontal: tokens.layout.screenPaddingX,
  },
  badgeItem: {
    alignItems: 'center',
    marginRight: tokens.spacing.lg,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: tokens.color.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  historyCard: {
    marginBottom: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

// ===== AppNavigator.js =====
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: tokens.color.primary,
    background: tokens.color.bg,
    card: tokens.color.surface,
    text: tokens.color.textPrimary,
    border: tokens.color.border,
    notification: tokens.color.error,
  },
};

function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tokens.color.bg,
          borderTopColor: tokens.color.border,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 10,
        },
        tabBarActiveTintColor: tokens.color.primary,
        tabBarInactiveTintColor: tokens.color.textMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="trophy" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// ===== App.js =====
function App() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
  });

  useEffect(() => {
    if (fontError) {
      console.warn('CodeQuest: fonts failed to load, using system fallbacks.', fontError);
    }
  }, [fontError]);

  // If a font fails to load we still boot the app instead of hanging forever.
  if (!fontsLoaded && !fontError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: tokens.color.bg,
        }}
      >
        <Text
          style={{
            color: tokens.color.success,
            fontFamily: 'JetBrainsMono_500Medium',
            fontSize: 16,
            marginBottom: 16,
          }}
        >
          &gt; Booting CodeQuest...
        </Text>
        <ActivityIndicator size="large" color={tokens.color.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthProvider>
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
